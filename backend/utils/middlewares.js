const { verifyAccessToken } = require('./token')

const isAuthenticated = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        const token = authorization.split(" ")[1]

        const payload = await verifyAccessToken(token)

        if (!payload) {
            throw new Error('invalid token: ')
        }
        req.user = payload
        return next()
    } catch (err) {
        res.setStatus(401)
        res.json({
            ok: false,
            message: err
        })
    }
}

module.exports = isAuthenticated