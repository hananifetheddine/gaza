const db = require('../../db');


async function rateArticle(req,res,next){
    try{
        const articleId = req.params.id;
        const userId= req.user_id;
        const {rating} = req.body;

        // check if article exist
        var [existingArticle] = await db.query('SELECT * FROM article WHERE article_id = ?', [articleId]);
        if (existingArticle.length === 0) {
            return res.status(404).json({ error: 'article not found' });
        }

        //update rating 
        qury ='INSERT INTO rating (rating, user_id,article_id ) VALUES (?, ?,?)';
        await db.execute(qury, [rating, userId, articleId]); 
        await db.execute(
            'UPDATE article SET rating = (SELECT AVG(rating) FROM rating WHERE article_id = ?) WHERE article_id = ?',
            [articleId, articleId],)

         // send notification
         const title = "Article rated";
         const content="A user rated your article : " + existingArticle[0].title +" by " +rating;
         qury ='INSERT INTO notification (user_id, title,description ) VALUES (?, ?,?)';
         await db.execute(qury, [ existingArticle[0].author_id, title, content]); 

        res.status(200).json({ error: 'rating added' });

    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports={rateArticle}