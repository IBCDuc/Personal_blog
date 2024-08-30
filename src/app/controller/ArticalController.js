const sql = require('mssql/msnodesqlv8')
const config = require('../models/config/config.js')
const { NVarChar } = require('msnodesqlv8')

class ArticalController {
    async artical(req,res) {
        const artid = req.params.id
        const pool = await sql.connect(config)
        const request = pool.request()
        request.input('input' , sql.Int, artid )
        const result = await request.query`SELECT * FROM [article].[dbo].[articles] where id = @input`
        //res.send(result)
        res.render('articals' , {articles: result.recordset})
    }
    async edit(req,res) {
        const artid = req.params.id
        const pool = await sql.connect(config)
        const request = pool.request()
        request.input('input', sql.Int, artid)
        const result = await  request.query`SELECT * FROM [article].[dbo].[articles] where id = @input`
        res.render('artedit', {edit: result.recordset})
    }
     new(req,res) {
        res.render('new')
    }
}
 
module.exports = new ArticalController()