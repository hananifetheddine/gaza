const StripeSecretKey = "sk_test_51Ky3VRGdiBciQXMJ2nod9Ou5x0wrrEbQ954zeZ4RSb2F8A9q6THsiqsuUcikIFdUgxFgLbtzvCRNSorXs88Qy6AG00tH3NCtxO";
const stripe = require('stripe')(StripeSecretKey)
const db = require("./../../db")


function donation(req, res, next) {
    if (req.user_id) {
        donationMoney(req, res, next);
    } else {
        donationMoneyAnonymous(req, res, next);
    }
}

async function donationMoneyAnonymous(req, res, next) {
    try {
        const { amount, first_name, last_name, email } = req.body;
        if (!amount || !first_name || !email || !last_name) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!amount) {
            return res.status(400).json({ error: 'amount is required' });
        }
        var data = { "amount": amount, "first_name": first_name, "last_name": last_name, "email": email };
        var sessionUrl = await createSesstion(data);
        res.status(200).json({ url: sessionUrl })
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });

    }

}

async function donationMoney(req, res, next) {
    try {
        id = req.user_id;
        const { amount } = req.body;
        if (!amount) {
            return res.status(400).json({ error: 'amount is required' });
        }
        var data = { "user_id": id, "amount": amount };
        var sessionUrl = await createSesstion(data);
        res.status(200).json({ url: sessionUrl })
    } catch (e) {
        res.status(500).json({ error: 'Internal Server Error' });

    }
}

async function createSesstion(data) {
    lineItemsArray = [{
        price_data: {
            currency: 'usd',
            product_data: {
                name: "donation"
            },
            unit_amount: data.amount
        },
        quantity: 1
    }]
    // open a session for payment

    var session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: lineItemsArray,
        // sending the infos in the metadata attribute
        metadata: { infos: JSON.stringify(data) },
        success_url: 'https://www.google.com',
        cancel_url: 'http://127.0.0.1:8090',
        expires_at: Math.floor(Date.now() / 1000 + 3600)
    })
    return session.url;
}

const endpointSecret = "whsec_6f27b2e13039a148919e0b0c4731b032c8bfbcad46f1228ad54d9c2eeaeecc41";

async function webhook(req, res) {
    const payload = req.body
    const sig = req.headers['stripe-signature']
    let event
    try {
        // check if event coming from stripe by signature
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            // getting  the infos from the metadata attribute
            const data = JSON.parse(session.metadata.infos)
            const { amount, first_name, last_name, email, user_id } = data;
            console.log('data:', data)
            if (data.user_id) {
                var qury = 'INSERT INTO donation_money (user_id, amount) VALUES (?, ?)';
                await db.execute(qury, [user_id, amount]);

                // send notification
                const title = "THANK YOU";
                const content = "THANK YOU FOR YOUR DONATION " + amount ;
                qury = 'INSERT INTO notification (user_id, title,description ) VALUES (?, ?,?)';
                await db.execute(qury, [user_id, title, content]);
            } else {
                var qury = 'INSERT INTO donation_money_anonymous ( amount,first_name,last_name,email) VALUES (?, ?,?,?)';
                await db.execute(qury, [amount, first_name, last_name, email]);
            }
        }
    } catch (err) {
        console.log(err);
    }

};

module.exports = { donation, webhook };