import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import contactRouter from './routes/contact.js'
import authRouter from './routes/auth.js'
import adminRouter from './routes/admin.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()

// Sécurité
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}))

// Parsing
app.use(express.json())
app.use(cookieParser())

// Logs (dev uniquement)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// Routes
app.use('/api/contact', contactRouter)
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)

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
