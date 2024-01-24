const db = require('../../../db');



async function getCommentsByUser(req,res,next){
    try{
        const userId = req.params.id;

        var [commentsUser] = await db.query('SELECT * FROM comment WHERE user_id = ?', [userId]);
       
        res.status(200).json({ comments: commentsUser });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports=getCommentsByUser