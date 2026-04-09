import prisma from '../lib/prisma.js'

export const saveContactMessage = async ({ name, email, subject, message }) => {
  return prisma.contactMessage.create({
    data: { name, email, subject, message },
  })
}
