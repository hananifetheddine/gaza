const express = require('express');
const router = express.Router();

const [upload, addArticle]= require('../controllers/journalist_controller/article'); 
const validation = require('../validations/verify_token')

router.post('/article',  validation.verifyTokenUser,upload,addArticle);

module.exports = router ;