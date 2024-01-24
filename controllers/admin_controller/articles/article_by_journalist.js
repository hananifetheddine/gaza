const db = require('../../../db');

async function articleByJournalist(req,res,next){
    try{
        const journalistId = req.params.id;
        var [articlesUser] = await db.query('SELECT * FROM article WHERE author_id = ?', [journalistId]);
        res.status(200).json({ articles:articlesUser });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports=articleByJournalist