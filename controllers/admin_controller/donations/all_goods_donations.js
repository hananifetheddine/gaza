const db = require('../../../db');


async function getDonationsGoods(req,res,next){
    try{
        var [allDonations] = await db.query('SELECT * FROM donation_goods ');
       
        res.status(200).json({ donations: allDonations });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports=getDonationsGoods