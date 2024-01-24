const express = require('express');
const router = express.Router();

const validation =  require('./../validations/verify_token');
const auth = require('../controllers/common_controller/auth');
const donationMoney = require('../controllers/common_donor_journalist_controllers/donation');
const donationGoods = require('../controllers/common_donor_journalist_controllers/donation_goods');
const comment = require('../controllers/common_donor_journalist_controllers/comment');
const article = require('../controllers/common_donor_journalist_controllers/article');


const [pic, update] = require('../controllers/common_donor_journalist_controllers/profile');

// auth
router.post('/login', auth.login );
router.put('/profile', validation.verifyTokenUser,pic,update );

// donation 
router.post('/donation/money', validation.verifyTokenDonation, donationMoney.donation);
router.post('/donation/goods', validation.verifyTokenDonation, donationGoods.donation);
router.post('/donation/hook', donationMoney.webhook);

// comment
router.post('/comment', validation.verifyTokenDonation, comment.addComment);

//rating
router.post('/rating/:id', validation.verifyTokenDonation, article.rateArticle);



module.exports = router ;