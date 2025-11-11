import express from 'express'
import { verifyToken } from '../middlewares/AuthMiddleware.js'
import { searchContacts } from '../controllers/contactsController.js'

const contactsRoutes = express.Router()

contactsRoutes.post("/search",verifyToken,searchContacts)

export default contactsRoutes