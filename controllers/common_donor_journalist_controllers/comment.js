const db = require('../../db');


async function addComment(req, res, next) {
    try {
        user_id=req.user_id;
        const { comment } = req.body;
        if (!comment) {
            return res.status(400).json({ error: 'comment is required' });
        }
        qury ='INSERT INTO comment (user_id, comment ) VALUES (?, ?)';
        await db.execute(qury, [user_id, comment]); 

        
        res.status(200).json({ message: 'comment added successfully' });
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports={addComment}