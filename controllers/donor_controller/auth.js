const bcrypt = require('bcrypt');
const db = require('../../db');


const registration = async (req,res,next) => {
    try{
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password ) {
            return res.status(400).json({ error: 'All fields are required' });
        }
    
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const [existingUser] = await db.execute('SELECT * FROM user_account WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'account already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        var qury ='INSERT INTO user_account (email, password,role,state ) VALUES (?, ?,?,?)';
        var user = await db.execute(qury, [email, hashedPassword, "donor", 0]); 
        const id = user[0].insertId;

        /// add to user donor_data 
        qury ='INSERT INTO user_data (user_id, first_name,last_name ) VALUES (?, ?,?)';
        await db.execute(qury, [id, first_name, last_name]); 
        res.status(201).json({ message: 'donor user added successfully' });

    }catch(err){
        res.status(500).json({ error: 'Internal Server Error' });

    }
}

module.exports = { registration};