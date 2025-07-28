import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import { getUsersFromStorage, addUserToStorage, deleteUserFromStorage } from "./utils/storage";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    setUsers(getUsersFromStorage());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleAddUser = (newUser) => {
    const latestUsers = getUsersFromStorage();

    if (editingUser) {
      const exists = latestUsers.some((u) => u.id === newUser.id);
      if (!exists) {
        setIsModalOpen(false);
        setEditingUser(null);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        return false;
      }

      const updatedUsers = latestUsers.map((u) =>
        u.id === newUser.id ? newUser : u
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      setIsModalOpen(false);
      setEditingUser(null);
      return true;
    } else {
      const updatedUsers = [...latestUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      setIsModalOpen(false);
      setEditingUser(null);
      return true;
    }
  };

  const handleDeleteUser = (userId) => {
    try {
      deleteUserFromStorage(userId);
      setUsers(getUsersFromStorage());
    } catch (error) {
      throw error;
    }
  };

  const normalize = (str) => str.trim();
  const filteredUsers = users.filter((user) => {
    const search = normalize(debouncedSearchTerm);
    return (
      normalize(user.name).includes(search) ||
      normalize(user.email).includes(search)
    );
  });

  const checkEmailExists = (email) => {
    return users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  };

  return (
    <div className="bg-gray-100">
      <SearchBar
        onAddUser={() => setIsModalOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <UserTable
        users={filteredUsers}
        onDelete={handleDeleteUser}
        onEdit={(user) => {
          setEditingUser(user);
          setIsModalOpen(true);
        }}
      />

      <UserForm
        isModalOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        onAddUser={handleAddUser}
        initialValues={editingUser}
        checkEmailExists={checkEmailExists}
      />
    </div>
  );
}
