const db = require('../../../db');





async function getArticles(req,res,next){
    try{
        var [allArticles] = await db.query('SELECT * FROM article ');
       
        res.status(200).json({ articles: allArticles });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports=getArticles