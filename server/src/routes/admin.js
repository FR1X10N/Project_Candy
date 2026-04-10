import { Router } from 'express'
import requireAuth from '../middlewares/requireAuth.js'
import prisma from '../lib/prisma.js'

const router = Router()

// Toutes les routes admin nécessitent une authentification
router.use(requireAuth)

// GET /api/admin/messages — liste des messages (non lus en premier)
router.get('/messages', async (req, res, next) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: [{ read: 'asc' }, { createdAt: 'desc' }],
    })
    res.json({ success: true, data: messages })
  } catch (err) {
    next(err)
  }
})

// PATCH /api/admin/messages/:id/read — marquer comme lu/non lu
router.patch('/messages/:id/read', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'ID invalide' })
    }

    const { read } = req.body
    const message = await prisma.contactMessage.update({
      where: { id },
      data: { read: Boolean(read) },
    })
    res.json({ success: true, data: message })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/admin/messages/:id — supprimer un message
router.delete('/messages/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'ID invalide' })
    }

    await prisma.contactMessage.delete({ where: { id } })
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

export default router
