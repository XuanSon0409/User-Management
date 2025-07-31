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

/**
 * Xóa user theo ID. Trả về true nếu thành công, false nếu không tồn tại.
 */
export const deleteUserFromStorage = (userId) => {
    const users = getUsersFromStorage();
    const exists = users.some((u) => u.id === userId);

    if (!exists) {
        return false;
    }

    const updatedUsers = users.filter((u) => u.id !== userId);
    saveUsersToStorage(updatedUsers);
    return true;
};

/**
 * Cập nhật thông tin user. Trả về true nếu thành công, false nếu không tồn tại.
 */
export const updateUserInStorage = (updatedUser) => {
    const users = getUsersFromStorage();
    const exists = users.some((u) => u.id === updatedUser.id);

    if (!exists) {
        return false;
    }

    const updatedUsers = users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
    );

    saveUsersToStorage(updatedUsers);
    return true;
};
