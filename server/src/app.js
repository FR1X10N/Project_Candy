import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import contactRouter from './routes/contact.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()

// Sécurité
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}))

// Parsing
app.use(express.json())

// Logs (dev uniquement)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// Routes
app.use('/api/contact', contactRouter)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// Gestion des routes inconnues
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route introuvable' })
})

// Gestion centralisée des erreurs (doit rester en dernier)
app.use(errorHandler)

export default app
