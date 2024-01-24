const db = require('../../../db');

async function deleteArticle(req,res,next){
    try{
        const articleId = req.params.id;
        var [existingArticle] = await db.query('SELECT * FROM article WHERE article_id = ?', [articleId]);
        if (existingArticle.length === 0) {
            return res.status(404).json({ error: 'article not found' });
        }
        await db.query('DELETE FROM article WHERE article_id = ?', [articleId]);

        res.status(200).json({ message: 'Article deleted' });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports=deleteArticle