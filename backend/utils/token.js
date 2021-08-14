const jwt = require('jsonwebtoken')
const { PROD, SECRET1, SECRET2, COOKIE_NAME } = require('../constants')
const User = require('../models/Users')

const createTokens = async (user) => {

    const { username, _id, tokenVersion } = user
    const payload = { username, _id }

    const accessToken = jwt.sign(payload, SECRET1, {
        expiresIn: "15s", // in real app this shold be in minutes,(I've set it in sec just for testing)
    })

    // tokenVersion is needed only in refreshToken
    payload.tokenVersion = tokenVersion
    const refreshToken = jwt.sign(payload, SECRET2, {
        expiresIn: "7d"
    })


    return { accessToken, refreshToken }

}

const verifyAccessToken = async (accessToken) => {
    try {
        const data = await jwt.verify(accessToken, SECRET1)
        return data
    } catch (err) {
        return null
    }
}

const verifyRefreshToken = async (refreshToken) => {
    try {
        const data = await jwt.verify(refreshToken, SECRET2)
        return data
    } catch (err) {
        return null
    }
}

const sendRefreshTokenAsCookie = (res, refreshToken) => {
    res.cookie(COOKIE_NAME, refreshToken, {
        httpOnly: true,
        path: '/api/auth',
        secure: PROD,
        expiresIn: 1000 * 60 * 60 * 24 * 7, // 7 days.
    })
}


// If the user has changed or forgotten their password
// by inc the tokenVersion, all the previous refreshTokens will become invalid.
const revokeRefreshTokens = async (_id) => {
    await User.findOneAndUpdate({ _id }, { $inc: { tokenVersion: 1 } }).exec()
    return true
}

module.exports = {
    createTokens,
    verifyAccessToken,
    verifyRefreshToken,
    sendRefreshTokenAsCookie,
    revokeRefreshTokens,
}