const db = require('../../../db');



const switchAccount = async (req, res) => {
    try {
        const userId = req.params.id;
        var [existingUser] = await db.query('SELECT * FROM user_account WHERE user_id = ?', [userId]);

        if (existingUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        existingUser=existingUser[0];

        const newState = (existingUser.state === 0) ? 1 : 0;

        // change the state of the user in the database
        await db.query('UPDATE user_account SET state = ? WHERE user_id = ?', [newState,userId]);

        res.status(200).json({ message: 'User account state changed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });

    }
};

module.exports = switchAccount ;