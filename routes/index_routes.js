const donorRoutes = require('./donor')
const journalistRoutes = require('./journalist')
const adminRoutes = require('./admin')
const commonRoutes = require('./common')
const commonJournalistDonorRoutes = require('./common_donor_journalist')


const express = require('express')
const router = express.Router()


router.use('/donor', donorRoutes)
router.use('/publisher', journalistRoutes)
router.use('/admin', adminRoutes)
router.use('/common', commonRoutes)
router.use('/user', commonJournalistDonorRoutes)


module.exports = router
