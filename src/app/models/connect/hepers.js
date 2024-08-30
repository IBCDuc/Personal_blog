const base64url = str => {
    return btoa(str).replace(/\+/g, '-')
            .replace(/\//g, '_' )
            .replace(/\=/, '')
}
module.exports = { base64url }