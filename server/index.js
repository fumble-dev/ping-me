import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './routes/AuthRoutes.js'
import contactsRoutes from './routes/contactsRoutes.js'
import setupSocket from './socket.js'


const app = express()
const port = process.env.PORT || 3000
const databaseUrl = process.env.DATABASE_URL


app.use(express.json({ limit: "5mb" }))
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use("/uploads/profiles", express.static("uploads/profiles"))

app.use("/api/auth", authRoutes)
app.use("/api/contacts", contactsRoutes)


const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

setupSocket(server)

mongoose.connect(databaseUrl)
    .then(() => console.log("DB Connection successful"))
    .catch((err) => console.log("Error conncecting to DB", err))