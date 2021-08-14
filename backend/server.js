require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth')


const { CORS_ORIGIN, MONGO_DB_URL, PORT } = require('./constants')

const main = async () => {
    await mongoose.connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    })

    const app = express()

    let CORS_ORIGINS = CORS_ORIGIN.split(' ')
    app.use(
        cors({
            origin: CORS_ORIGINS,
            credentials: true
        })
    )

    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.get("/", (_, res) => res.json('Hello World...!'))

    app.use("/api/auth", authRoutes)

    app.listen(PORT, () => console.log(`URL: http://localhost:${PORT}`))
}

main()


/* ---------> Without using cors module

// app.all('*', (req, res, next) => {
//     console.log(req.header('origin'))
//     var origin = cors.origin.indexOf(req.header('origin').toLowerCase()) > -1 ? req.headers.origin : cors.default;
//     res.header("Access-Control-Allow-Origin", origin);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//     next()


// })*/
