const jwtSecure = "5aagYiMhXvTDrHbwBftdzR8bC67Umxj0MKFCBFfVR4ezntCSbawMUYXZ0dWGPHBIGUEbTAH0iLKeKCr8MaOpkm9E9bYSr/hHsrARsfDpN3gruJUCuQAFv5I0QFipJtgww554kvXzIh8uecC0uSY8+ta59swx4WaQ/xhSzI509Sgdzr8dvxaldDEgOvKlFA/obaV0oHUnr1lEVCx4AJ0aIrlccWNBAhvWl8dGlFigP5p/EoOIrR5tTSb2BQhL5jHdmRZxiwrC8bvKJZZk0v4Kf36QEK9USxk5mbDO0KqDLzsv9HdKUTd+/EcQrLZT51XFHstATFnxss/nAsnhhlfXHw=="
const crypto = require('crypto')

const config = require('../models/config/adminconfig.js')
const sql = require('mssql/msnodesqlv8') 

const jwtverity = async (req, res, next) => {
    const jwtclient = req.cookies.id
    if (!jwtclient) {
        return res.send('bug')
    }   
    const [HEADER, PAYLOAD, SIGNATURE] = jwtclient.split('.')

    const PayloadDecoded = JSON.parse(atob(PAYLOAD))
    
    const tokenData = `${HEADER}.${PAYLOAD}`
    const hmac = crypto.createHmac('sha256', jwtSecure )
    const signature = hmac.update(tokenData).digest('base64url')
    const JWT = `${tokenData}.${signature}`
    //connect 
    const pool = await sql.connect(config)
    const request = pool.request()
    const id = PayloadDecoded.sub
    const result = await request.query`SELECT * FROM [User].[dbo].[User_info] where ID = ${id}`
    
    if (!result) {
        return res.redirect('/login')
    }
    if (jwtclient === JWT) {
        res.locals.user = result.recordset[0].name
        next()
        
    } else {
        return res.redirect('/login')
    }
}


module.exports = jwtverity