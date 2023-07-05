import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './db.js'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import orderRoute from './routes/orderRoute.js'

const app = express()
dotenv.config()
const api = process.env.API_PATH

// Middleware
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    credentials: true,
    accessControlAllowOrigin: true,
    allowedHeaders: true
}))

// Connect DB
connectDB()

// USE ROUTES
app.use(api, userRoute)
app.use(api, productRoute)
app.use(api, orderRoute)

// PORT
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App listening at port http://localhost:${PORT}/api`))