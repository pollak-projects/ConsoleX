const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
console.log(username, email, password);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sqlQuery = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
        db.query(sqlQuery, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error during user registration:', err);
                return res.status(500).json({ message: 'An error occurred during user registration' });
            }
            res.status(201).json({ message: 'User successfully registered', userId: result.insertId });
        });
    } catch (err) {
        console.error('Error during password hashing:', err);
        res.status(500).json({ message: 'An error occurred during user registration' });
    }
};
