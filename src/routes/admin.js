const express = require('express')
const router = express.Router()
const admincontroller = require('../app/controller/AdminController')
const jwtverity = require('../app/middleware/jwtverify.js')
module.exports = router

router.get('/admin', jwtverity, admincontroller.articleadmin)
