const express = require('express');
const router = express.Router();

const auth = require('../controllers/donor_controller/auth');
const validation = require('../validations/verify_token');


router.post('/registration', auth.registration );


module.exports = router ;