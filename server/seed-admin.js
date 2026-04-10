/**
 * Script de création du compte admin initial.
 * Usage : node seed-admin.js
 *
 * Ce script ne peut pas créer un second admin si l'email existe déjà.
 * Pour changer le mot de passe, supprimez l'entrée en DB puis relancez.
 */
import 'dotenv/config'
import bcrypt from 'bcrypt'
import prisma from './src/lib/prisma.js'
import { createInterface } from 'readline'

const rl = createInterface({ input: process.stdin, output: process.stdout })
const ask = (q) => new Promise((resolve) => rl.question(q, resolve))

const email = await ask('Email admin : ')
const password = await ask('Mot de passe : ')
rl.close()

if (!email || !password || password.length < 8) {
  console.error('❌ Email et mot de passe requis (min. 8 caractères)')
  process.exit(1)
}

const existing = await prisma.user.findUnique({ where: { email } })
if (existing) {
  console.error(`❌ Un admin avec l'email "${email}" existe déjà.`)
  await prisma.$disconnect()
  process.exit(1)
}

const passwordHash = await bcrypt.hash(password, 12)
const user = await prisma.user.create({ data: { email, passwordHash } })

console.log(`✅ Admin créé avec l'email : ${user.email}`)
await prisma.$disconnect()
