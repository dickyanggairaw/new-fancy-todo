const jwt = require('jsonwebtoken')

let secretKey = process.env.KEY_SECRET 

function access(user){
    let accessToken = jwt.sign({
        id: user.id,
        email: user.email
    }, secretKey)
    return accessToken
}
function catchJwt(token){
    var decoded = jwt.verify(token, secretKey)
    return decoded
}
module.exports = {access, catchJwt}