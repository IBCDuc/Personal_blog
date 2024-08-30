const express = require('express')
const router = express.Router()
const homecontroller = require('../app/controller/HomeController')
module.exports = router
const articalcontroller = require('../app/controller/ArticalController')
const admincontroller = require('../app/controller/AdminController')
const authcontroller = require('../app/controller/AuthController')
const jwtverity = require('../app/middleware/jwtverify')



router.post('/auth-login', authcontroller.authlogin)
router.post('/auth-signup', authcontroller.authsign)
router.post('/update/:id', admincontroller.updatearticle)
router.post('/add', admincontroller.addarticle)


router.get('/logout', admincontroller.logout)
router.get('/login', authcontroller.login )
router.get('/signup', authcontroller.signup)
router.get('/delete/:id' , admincontroller.deletearticle)
router.get('/new', articalcontroller.new)
router.get('/edit/:id', articalcontroller.edit )
router.get('/', homecontroller.home)