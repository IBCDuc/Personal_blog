const sql = require('mssql/msnodesqlv8')
const dotenv = require('dotenv')
dotenv.config({path: './.env'})
const config = {
    sever: process.env.DB_SERVER2 ,
    database: process.env.DB_DATABASE2 ,
    drive: process.env.DB_DRIVE2,
    options: {
        trustedConnection: process.env.DB_TRUSTED_CONNECTION2
    },
    connectionString: 'DSN=SQL server1'
}


module.exports = config