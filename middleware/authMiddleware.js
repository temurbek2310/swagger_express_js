const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token is missing' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user; // Foydalanuvchi ma'lumotlarini requestga qo‘shamiz
        next();
    });
};

module.exports = { authenticateToken };
