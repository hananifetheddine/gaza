const db = require('../../../db');



async function getComments(req,res,next){
    try{
        var [allComments] = await db.query('SELECT * FROM comment ');
       
        res.status(200).json({ comments: allComments });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports=getComments