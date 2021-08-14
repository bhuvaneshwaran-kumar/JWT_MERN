const dotenv = require('dotenv');
dotenv.config()

const PORT = parseInt(process.env.PORT)
const CORS_ORIGIN = process.env.CORS_ORIGIN

const NODE_ENV = process.env.NODE_ENV
const PROD = NODE_ENV === 'production'

const MONGO_DB_URL = process.env.MONGO_DB_URL

const SECRET1 = process.env.SECRET1
const SECRET2 = process.env.SECRET2

const COOKIE_NAME = process.env.COOKIE_NAME



module.exports = {
    PORT, CORS_ORIGIN, NODE_ENV, PROD, MONGO_DB_URL, SECRET2, SECRET1, COOKIE_NAME
}