import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { contactSchema } from '../validators/contactSchema.js'
import { saveContactMessage } from '../services/contactService.js'
import { sendContactNotification, sendContactConfirmation } from '../services/mailer.js'

const router = Router()

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { success: false, message: 'Trop de tentatives, réessayez dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})

router.post('/', contactLimiter, async (req, res, next) => {
  try {
    const result = contactSchema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: result.error.flatten().fieldErrors,
      })
    }

    const { name, email, subject, message } = result.data

    await saveContactMessage({ name, email, subject, message })

    // Envoi des emails en parallèle (non bloquant si échec)
    Promise.all([
      sendContactNotification({ name, email, subject, message }),
      sendContactConfirmation({ name, email }),
    ]).catch((err) => console.error('Erreur envoi email :', err))

    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès',
    })
  } catch (err) {
    next(err)
  }
})

export default router
