const db = require('../../../db');


async function deleteComment(req,res,next){
    try{
        const articleId = req.params.id;
        var [existingArticle] = await db.query('SELECT * FROM comment WHERE comment_id = ?', [articleId]);
        if (existingArticle.length === 0) {
            return res.status(404).json({ error: 'comment not found' });
        }
        await db.query('DELETE FROM comment WHERE comment_id = ?', [articleId]);

        res.status(200).json({ message: 'comment deleted' });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports=deleteComment