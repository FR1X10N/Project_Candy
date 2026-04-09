import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string({ required_error: 'Le nom est requis' })
    .trim()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),

  email: z
    .string({ required_error: "L'email est requis" })
    .trim()
    .email('Adresse email invalide')
    .max(254, "L'email ne peut pas dépasser 254 caractères"),

  subject: z
    .string()
    .trim()
    .max(150, 'Le sujet ne peut pas dépasser 150 caractères')
    .optional(),

  message: z
    .string({ required_error: 'Le message est requis' })
    .trim()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(2000, 'Le message ne peut pas dépasser 2000 caractères'),
})
