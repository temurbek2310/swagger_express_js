const bcrypt = require('bcrypt');

const users = [
    { id: 1, username: "admin", password: "hashed_password" }, // Misol uchun foydalanuvchi
];

const addUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, username, password: hashedPassword };
    users.push(user);
    return user;
};

const findUserById = (id) => users.find(user => user.id === id);

const updateUser = (id, newData) => {
    const user = findUserById(id);
    if (user) {
        Object.assign(user, newData);
        return user;
    }
    return null;
};

const deleteUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1);
    }
    return null;
};

const findUser = (username) =>
    users.find(user => user.username.toLowerCase() === username.toLowerCase());

module.exports = { addUser, findUserById, updateUser, deleteUser, findUser, users };