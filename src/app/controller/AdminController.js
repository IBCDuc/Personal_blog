const sql = require('mssql/msnodesqlv8')
const config = require('../models/config/config.js')
class Adminart {
    async articleadmin(req,res) {
       const pool = await sql.connect(config)
       const request = pool.request()
       const result =  await request.query`SELECT * FROM [article].[dbo].[articles]`
       res.render('admin', {article: result.recordset})
    }

    async deletearticle(req,res) {
        const articleid = req.params.id
        const pool = await sql.connect(config)
        const request = pool.request()
        request.input('input', sql.Int, articleid)
        const result = await request.query`DELETE FROM [article].[dbo].[articles] where id = @input`
        res.redirect('/admin')
    }

    async addarticle(req,res) {
        const {title, date, content} = req.body
        
        const pool = await sql.connect(config)
        const request = pool.request()
        const result = await request.query`INSERT INTO [article].[dbo].[articles] (title, publication, content) VALUES (${title}, ${date}, ${content})`
        res.redirect('/admin')
    }
    async updatearticle(req,res) {
        const {title, date, content} = req.body
        const {id} = req.params
        console.log(req.params)
        const pool = await sql.connect(config)
        const request = pool.request()
        const result = await request.query`UPDATE [article].[dbo].[articles] SET title = ${title}, publication = ${date}, content = ${content} WHERE ID = ${id}`
        res.redirect('/admin')
    }
    logout(req,res) {
        res.clearCookie('id')
        res.redirect("/")
    }
}
module.exports = new Adminart()