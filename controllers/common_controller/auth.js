const bcrypt = require('bcrypt');
const db = require('../../db');
const jwt = require('jsonwebtoken');


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'All fields are required' });

        if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters long' });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email format' });
        
        var query = 'SELECT * FROM user_account WHERE email = ?';
        var [user] = await db.execute(query, [email]);
        if (user.length === 0) return res.status(401).json({ error: 'No accout for the provided email' });
        
        user = user[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ error: 'Invalid email or password' });

        const token = jwt.sign({ user_id: user.user_id, email: user.email }, 'your-secret-key', { expiresIn: '24h' });
        query ='SELECT * FROM user_data WHERE user_id = ?';
        var [data] = await db.execute(query, [user.user_id]);
        data=data[0];
        console.log(data);
        res.status(200).json({
            "token":token,
            "user":{
                ...data,
                email:user.email,
                role:user.role
            }
        })
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });

    }
}

module.exports = { login };