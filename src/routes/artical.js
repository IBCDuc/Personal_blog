const express = require('express')
const router = express.Router()
const articalcontroller = require('../app/controller/ArticalController.js')
const jwtverity = require('../app/middleware/jwtverify.js')
module.exports = router



router.get('/:id', articalcontroller.artical)
router.get('/', articalcontroller.artical)
