const db = require("./../../db")

function donation(req, res, next) {
  if (req.user_id) {
    donationGoods(req, res, next);
  } else {
    donationGoodsAnonymous(req, res, next);
  }
}

async function donationGoods(req, res, next) {
  try {
    user_id = req.user_id;
    const { type  } = req.body;
    if (!type) {
        return res.status(400).json({ error: 'type is required' });
    }

    var qury = 'INSERT INTO donation_goods (user_id, type) VALUES (?, ?)';
    await db.execute(qury, [user_id,type]);

    // send notification
    const title = "THANK YOU";
    const content = "WE GONNA COME SOON "  ;
    qury = 'INSERT INTO notification (user_id, title,description ) VALUES (?, ?,?)';
    await db.execute(qury, [user_id, title, content]);
    res.status(200).json({ message: 'donation added successfully' });

  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function donationGoodsAnonymous(req, res, next) {
  try {
    const { first_name, last_name, email, phone_number, address, type } = req.body;
    if ( !first_name || !email || !last_name || !phone_number || !address || !type) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    var qury = 'INSERT INTO donation_goods_anonymous (first_name, last_name,email,phone_number,address,type ) VALUES (?, ?,?,?,?,?)';
    await db.execute(qury, [first_name, last_name, email, phone_number,address,type]); 

    res.status(200).json({ message: 'donation added successfully' });

  } catch (e) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = { donation }