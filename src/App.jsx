import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import {
  getUsersFromStorage,
  addUserToStorage,
  deleteUserFromStorage,
  updateUserInStorage,
} from "./utils/storage";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    setUsers(getUsersFromStorage());
    const handleStorageChange = (event) => {
      if (event.key === "users") {
        setUsers(getUsersFromStorage());
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleAddUser = (newUser) => {
    if (editingUser) {
      const success = updateUserInStorage(newUser);
      if (!success) {
        alert("User ID not found. Reloading...");
        setIsModalOpen(false);
        setEditingUser(null);
        setUsers(getUsersFromStorage());
        return false;
      }

      setUsers(getUsersFromStorage());
      setIsModalOpen(false);
      setEditingUser(null);
      return true;
    } else {
      addUserToStorage(newUser);
      setUsers(getUsersFromStorage());
      setIsModalOpen(false);
      setEditingUser(null);
      return true;
    }
  };

  const handleDeleteUser = (userId) => {
    const success = deleteUserFromStorage(userId);
    if (!success) {
      alert("User ID not found. Reloading...");
    }
    setUsers(getUsersFromStorage());
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
          setUsers(getUsersFromStorage());
        }}
        onAddUser={handleAddUser}
        initialValues={editingUser}
        checkEmailExists={checkEmailExists}
      />
    </div>
  );
}
