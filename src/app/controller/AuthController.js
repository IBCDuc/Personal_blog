const jwtSecure = "5aagYiMhXvTDrHbwBftdzR8bC67Umxj0MKFCBFfVR4ezntCSbawMUYXZ0dWGPHBIGUEbTAH0iLKeKCr8MaOpkm9E9bYSr/hHsrARsfDpN3gruJUCuQAFv5I0QFipJtgww554kvXzIh8uecC0uSY8+ta59swx4WaQ/xhSzI509Sgdzr8dvxaldDEgOvKlFA/obaV0oHUnr1lEVCx4AJ0aIrlccWNBAhvWl8dGlFigP5p/EoOIrR5tTSb2BQhL5jHdmRZxiwrC8bvKJZZk0v4Kf36QEK9USxk5mbDO0KqDLzsv9HdKUTd+/EcQrLZT51XFHstATFnxss/nAsnhhlfXHw=="
const crypto = require('crypto')
const {base64url} = require("../models/connect/hepers.js")
const config = require('../models/config/adminconfig.js')
const sql = require('mssql/msnodesqlv8')    
class Auth {
    login(req,res) {
        res.render('login')
    }
    signup(req,res) {
        res.render('signup')
    }
    async authsign(req,res) {
        const {name, email, password} = req.body
        const pool = await sql.connect(config)
        const request = pool.request()
        const result = await request.query`INSERT INTO [User].[dbo].[User_info] (name, email, password) values (${name}, ${email}, ${password})`
        res.render('signup', {message: "successfull"})
    }
    async authlogin(req,res) {

        const {email, password} = req.body
        const pool = await sql.connect(config)
        const request = pool.request()
        const result = await request.query`SELECT * FROM [User].[dbo].[User_info] where email = ${email} and password = ${password}`
        if (result.recordset.length > 0) {
            const Header = {
                "alg": "HS256",
                "typ": "JWT"
            }
            const Payload = {
                "sub": result.recordset[0].id,
                "name": result.recordset[0].name
            }
            const HeaderEncoded = base64url(JSON.stringify(Header))
            const PayloadEncoded = base64url(JSON.stringify(Payload))
            const tokenData = `${HeaderEncoded}.${PayloadEncoded}`
            const hmac = crypto.createHmac('sha256',jwtSecure )
            const signature = hmac.update(tokenData).digest('base64url')
            const JWT = `${tokenData}.${signature}`
            res.cookie('id', JWT, {
                httpOnly: true,
                expires: new Date(Date.now() + 60*60*60*60)
            })
            res.redirect('/auth/admin')
        } else {
            res.render('login' ,{message: "wrong!!!"})
        }
    }

    
}
module.exports = new Auth()