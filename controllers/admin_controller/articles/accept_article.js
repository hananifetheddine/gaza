const db = require('../../../db');

async function acceptArticle(req,res,next){
    try{
        const articleId = req.params.id;
        var [existingArticle] = await db.query('SELECT * FROM article WHERE article_id = ?', [articleId]);
        if (existingArticle.length === 0) {
            return res.status(404).json({ error: 'article not found' });
        }
        await db.query('UPDATE article SET state = ? WHERE article_id = ?', [0,articleId]);
        
        // send notification
        const title = "Article accepted";
        const content="The article with title : " + existingArticle[0].title +" has been accepted";
        qury ='INSERT INTO notification (user_id, title,description ) VALUES (?, ?,?)';
        await db.execute(qury, [ existingArticle[0].author_id, title, content]); 

        res.status(200).json({ message: 'Article accepted' });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports=acceptArticle