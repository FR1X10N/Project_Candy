import { verifyToken } from '../services/authService.js'

const requireAuth = (req, res, next) => {
  const token = req.cookies?.token

  if (!token) {
    return res.status(401).json({ success: false, message: 'Non authentifié' })
  }

  try {
    req.user = verifyToken(token)
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Session expirée' })
  }
}

export default requireAuth
