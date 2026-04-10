import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { loginSchema } from '../validators/authSchema.js'
import { verifyCredentials, generateToken, verifyToken } from '../services/authService.js'

const router = Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { success: false, message: 'Trop de tentatives, réessayez dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 8 * 60 * 60 * 1000, // 8h
}

// POST /api/auth/login
router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const result = loginSchema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: result.error.flatten().fieldErrors,
      })
    }

    const { email, password } = result.data
    const user = await verifyCredentials(email, password)

    if (!user) {
      return res.status(401).json({ success: false, message: 'Identifiants incorrects' })
    }

    const token = generateToken(user)
    res.cookie('token', token, COOKIE_OPTIONS)

    res.json({ success: true, user: { email: user.email } })
  } catch (err) {
    next(err)
  }
})

// POST /api/auth/logout
router.post('/logout', (_req, res) => {
  res.clearCookie('token', COOKIE_OPTIONS)
  res.json({ success: true })
})

// GET /api/auth/me
router.get('/me', (req, res) => {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ success: false })

  try {
    const user = verifyToken(token)
    res.json({ success: true, user: { email: user.email } })
  } catch {
    res.status(401).json({ success: false })
  }
})

export default router
