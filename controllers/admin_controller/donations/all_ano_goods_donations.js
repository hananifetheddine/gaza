const db = require('../../../db');


async function getAnoDonationsGoods(req,res,next){
    try{
        var [allDonations] = await db.query('SELECT * FROM donation_goods_anonymous ');
       
        res.status(200).json({ donations: allDonations });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports=getAnoDonationsGoods