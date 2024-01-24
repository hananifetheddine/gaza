const express = require('express');
const router = express.Router();

const auth = require('../controllers/common_controller/auth');
const manageAccounts = require('../controllers/admin_controller/manage_accounts/index_accounts');
const manageAcrticle = require('../controllers/admin_controller/articles/index_article');
const manageComments = require('../controllers/admin_controller/comments/index_comments');
const manageDonations = require('../controllers/admin_controller/donations/index_donations');

//accounts
router.post('/login', auth.login );
router.post('/journalist', manageAccounts.addJournalist );
router.put('/switch_account/:id', manageAccounts.switchAccount );

//articles
router.put('/article/:id', manageAcrticle.acceptArticle );
router.delete('/article/:id', manageAcrticle.deleteArticle );
router.get('/article/publisher/:id', manageAcrticle.articlesByJournalist );
router.get('/article', manageAcrticle.allArticles );
router.get('/article/:id', manageAcrticle.articleById );

//comments
router.delete('/comment/:id', manageComments.deleteComment );
router.get('/comment/user/:id', manageComments.commentsByUser );
router.get('/comment', manageComments.allComments );

//donations
router.get('/donation/money', manageDonations.allDonationMoney );
router.get('/donation/money/user/:id', manageDonations.donationMoneyByUser );
router.get('/donation/goods', manageDonations.allDonationGoods );
router.get('/donation/goods/user/:id', manageDonations.donationGoodsByUser );
router.get('/donation/goods/anonymous', manageDonations.allAnoDonationGoods );
router.get('/donation/money/anonymous', manageDonations.allAnoDonationMoney );


module.exports = router ;