const STORAGE_KEY = 'users';

export const getUsersFromStorage = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveUsersToStorage = (users) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const addUserToStorage = (user) => {
    const users = getUsersFromStorage();
    users.push(user);
    saveUsersToStorage(users);
};

export const deleteUserFromStorage = (userId) => {
    const users = getUsersFromStorage();
    const exists = users.some((u) => u.id === userId);

    if (!exists) {
        throw new Error("User ID not found");
    }

    const updatedUsers = users.filter((u) => u.id !== userId);
    saveUsersToStorage(updatedUsers);
};

export const updateUserInStorage = (updatedUser) => {
    const users = getUsersFromStorage();
    const exists = users.some((u) => u.id === updatedUser.id);

    if (!exists) {
        throw new Error("User ID not found");
    }

    const updatedUsers = users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
    );

    saveUsersToStorage(updatedUsers);
};

