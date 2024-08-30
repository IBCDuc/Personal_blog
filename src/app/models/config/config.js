const sql = require('mssql/msnodesqlv8')
const dotenv = require('dotenv')
dotenv.config({path: './.env'})
const config = {
    sever: process.env.DB_SERVER ,
    database: process.env.DB_DATABASE ,
    drive: process.env.DB_DRIVE,
    options: {
        trustedConnection: process.env.DB_TRUSTED_CONNECTION
    },
    connectionString: 'DSN=SQL server1'
}


module.exports = config