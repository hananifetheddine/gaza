const db = require('../../../db');

async function articleByJournalist(req,res,next){
    try{
        const id = req.params.id;
        var [article] = await db.query('SELECT * FROM article WHERE article_id = ?', [id]);
        res.status(200).json({ article:article[0] });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports=articleByJournalist