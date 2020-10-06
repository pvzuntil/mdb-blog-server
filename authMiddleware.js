const jwt = require('jsonwebtoken')
const makeRes = require('./lib/response')

function authMiddleware(req, res, next) {
    const token = req.header('api-token')

    if(!token){
        return res.status(400).send(makeRes(0, 'Token diperlukan'))
    }

    try {
        const checkToken = jwt.verify(token, process.env.JWT_KEY)
        req.user = checkToken
        next()
    } catch (error) {
        return res.status(400).send(makeRes(0, 'Token anda salah'))
    }
}

module.exports = authMiddleware