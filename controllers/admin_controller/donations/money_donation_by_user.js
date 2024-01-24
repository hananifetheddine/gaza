const db = require('../../../db');


async function getDonationsMoneyByUser(req,res,next){
    try{
        const id = req.params.id;
        var [allDonations] = await db.query('SELECT * FROM donation_money where user_id= ?',[id]);
       
        res.status(200).json({ donations: allDonations });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports=getDonationsMoneyByUser