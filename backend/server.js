import express from "express"
import path from 'path'
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
const app = express()
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import productRoute from "./routes/productRoute.js"
import contactRoute from './routes/contactRoute.js'
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
connectDB()
app.use(`/api/products`,productRoute)
app.use('/api/form', contactRoute)
app.use('/api/orders', orderRoutes)
app.use(`/api/users`, userRoutes)
app.use(`/api/upload`, uploadRoutes)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}
app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 5000
app.listen(port,()=> console.log(`the server running at port${port}`))