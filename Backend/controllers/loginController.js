const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const sqlQuery = 'SELECT * FROM user WHERE email = ?';
        db.query(sqlQuery, [email], async (err, results) => {
            if (err) {
                console.error('Error during user login:', err);
                return res.status(500).json({ message: 'An error occurred during user login' });
            }

            if (results.length === 0) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const user = results[0];

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

            res.status(200).json({ message: 'User successfully logged in', token });
        });
    } catch (err) {
        console.error('Error during user login:', err);
        res.status(500).json({ message: 'An error occurred during user login' });
    }
};
