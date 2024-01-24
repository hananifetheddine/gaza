const db = require('../../db');


async function getNotificationsByUser(req,res,next){
    try{
        const id = req.user_id;
        var [allNotifications] = await db.query('SELECT * FROM notification where user_id= ?',[id]);
       
        res.status(200).json({ Notifications: allNotifications });
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports={getNotificationsByUser}