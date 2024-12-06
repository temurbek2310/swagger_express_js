const bcrypt = require('bcryptjs');

const users = [
    { id: 1, username: "admin", password: "1234" }, // Avvaldan qo'shilgan foydalanuvchi
    { id: 2, username: "user1", password: "password" }
];


const addUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, username, password: hashedPassword };
    users.push(user);
    return user;
}

const findUser = (username) => users.find(user => user.username === username);

module.exports = { addUser, findUser, users };