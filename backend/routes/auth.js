const express = require('express')
const User = require('../models/Users')
const bcrypt = require('bcrypt')
const Router = express.Router()

const { verifyAccessToken, sendRefreshTokenAsCookie, createTokens,
    revokeRefreshTokens, verifyRefreshToken } = require('../utils/token')
const { COOKIE_NAME } = require('../constants')



// verify the refresh token from cookie
// return user,accessToken (sets new refreshToken in res as a cookie)
Router.post('/refresh', async (req, res) => {
    const token = req.cookies[COOKIE_NAME]
    if (!token) {
        return res.json({
            ok: false,
            message: 'no token Provided'
        })
    }

    const payload = await verifyRefreshToken(token)
    if (!payload) {
        return res.json({
            ok: false,
            message: 'refresh token expaired'
        })
    }

    const user = await User.findById(payload._id).exec()
    if (!user) {
        return res.json({ ok: false, message: 'no user exists with that token' })
    }

    if (user.tokenVersion !== payload.tokenVersion) {
        return res.json({ ok: false, message: 'Invalid Token' })
    }

    const { accessToken, refreshToken } = await createTokens(user)
    sendRefreshTokenAsCookie(res, refreshToken)

    const { username, email, _id } = user
    return res.json({
        ok: true,
        data: { accessToken, user: { username, email, _id } }
    })

})

// SIGN UP
Router.post('/signup', async (req, res) => {
    const data = req.body
    try {
        const oldUsers = await User.find({ email: data.email })
        if (oldUsers.length > 0) {
            return res.json({
                ok: false,
                message: 'user already found with the eamil id'
            })
        }

        data.password = await bcrypt.hash(data.password, 10)

        const newUser = new User(data)
        await newUser.save()
        const { username, email, _id } = newUser

        return res.json({
            ok: true,
            data: { username, email, _id }
        })
    }
    catch (err) {
        console.error("Sign up error :-", err)
        return res.json({
            ok: false,
            message: "something went wrong"
        })
    }
})

//  LOG IN
Router.post('/login', async (req, res) => {
    const data = req.body
    try {
        const user = await User.findOne({ email: data.email })
        if (!user) {
            return res.json({
                ok: false,
                message: `No User Exists with a eamil of ${data.email}`
            })
        }

        const isCorrectPassword = await bcrypt.compare(data.password, user.password)
        if (!isCorrectPassword)
            return res.json({
                ok: false,
                message: `Invalid password`
            })

        const { accessToken, refreshToken } = await createTokens(user)
        await sendRefreshTokenAsCookie(res, refreshToken)

        const { username, email, _id } = user

        res.json({
            ok: true,
            data: { accessToken, user: { username, _id, email } }
        })

    }
    catch (err) {
        console.log(`Error while logging in: ${err.message}`)
    }
})

Router.post('/logout', async (req, res) => {
    try {
        await sendRefreshTokenAsCookie(res, '')
        res.json({
            ok: true,
            message: 'successfully Logged out'
        })
    } catch (err) {
        res.json({
            ok: false, message: 'Ooops error occured.'
        })
    }

})




module.exports = Router