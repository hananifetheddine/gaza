const express = require('express');
const router = express.Router();
const validation =  require('./../validations/verify_token');

const notification = require("../controllers/common_controller/noitification_by_user")

router.get('/notification',  validation.verifyTokenDonation,notification.getNotificationsByUser );
module.exports = router ;