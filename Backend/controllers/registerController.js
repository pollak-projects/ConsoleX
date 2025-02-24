const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);

    try {
        const checkQuery = 'SELECT * FROM user WHERE username = ? OR email = ?';
        db.query(checkQuery, [username, email], async (err, results) => {
            if (err) {
                console.error('Error during user check:', err);
                return res.status(500).json({ message: 'Egy hiba lépett fel a regisztráció során' });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: 'A felhasználónév vagy az Email már használatban van!' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const sqlQuery = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
            db.query(sqlQuery, [username, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error during user registration:', err);
                    return res.status(500).json({ message: 'Egy hiba lépett fel a regisztráció során' });
                }
                res.status(201).json({ message: 'Sikeresen regisztráltál!', userId: result.insertId });
            });
        });
    } catch (err) {
        console.error('Error during password hashing:', err);
        res.status(500).json({ message: 'Egy hiba lépett fel a regisztráció során' });
    }
};
