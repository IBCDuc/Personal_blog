const homeRouter = require('./home')
const articalRouter = require('./artical')
const articleadmin = require('./admin')

function route(app) {
    app.use("/", homeRouter),
    app.use("/article", articalRouter)
    app.use('/auth', articleadmin)
}
module.exports = route