const config = require('../models/config/config.js')
const sql = require('mssql/msnodesqlv8')


class HomeController {
    home(req,res) {
        sql.connect(config , function(err) {
            if (err) {
                console.log(err,'daylaloi')
            } else {
                const  request = new sql.Request()
                const article_query = `SELECT * FROM [article].[dbo].[articles]`
                request.query(article_query, (err , result) => {
                    if (err) {
                        console.log(err,'daylaloi2')
                    } else {
                        //res.send(result.recordset)
                        res.render('home' , {article: result.recordset})
                    }
                })
            }
        })
    }
} 
      
module.exports = new HomeController()