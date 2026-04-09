import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendContactNotification = async ({ name, email, subject, message }) => {
  await transporter.sendMail({
    from: `"Project Candy" <${process.env.SMTP_USER}>`,
    to: process.env.MAIL_TO,
    subject: `Nouveau message de contact${subject ? ` — ${subject}` : ''}`,
    text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      ${subject ? `<p><strong>Sujet :</strong> ${subject}</p>` : ''}
      <hr />
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  })
}

export const sendContactConfirmation = async ({ name, email }) => {
  await transporter.sendMail({
    from: `"Project Candy" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Votre message a bien été reçu',
    text: `Bonjour ${name},\n\nNous avons bien reçu votre message et reviendrons vers vous rapidement.\n\nL'équipe Project Candy`,
    html: `
      <p>Bonjour <strong>${name}</strong>,</p>
      <p>Nous avons bien reçu votre message et reviendrons vers vous rapidement.</p>
      <p>L'équipe Project Candy</p>
    `,
  })
}
