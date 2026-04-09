import useContactForm from '@/hooks/useContactForm'

const inputClass = (error) =>
  `w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
    error
      ? 'border-red-400 focus:border-red-500'
      : 'border-gray-200 focus:border-pink-400'
  }`

const ContactSection = () => {
  const { fields, errors, status, handleChange, handleSubmit } = useContactForm()

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-pink-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Contact
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Passez votre commande
          </h2>
          <p className="text-gray-500">
            Décrivez-nous votre projet et nous vous répondons sous 48h.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <p className="text-3xl mb-3">🎉</p>
            <h3 className="text-xl font-bold text-green-800 mb-2">Message envoyé !</h3>
            <p className="text-green-700">
              Merci pour votre message. Nous vous répondrons dans les meilleurs délais.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nom <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={fields.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className={inputClass(errors.name)}
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email <span className="text-pink-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className={inputClass(errors.email)}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Sujet
              </label>
              <input
                type="text"
                name="subject"
                value={fields.subject}
                onChange={handleChange}
                placeholder="Ex : Gâteau d'anniversaire — 50 personnes"
                className={inputClass(errors.subject)}
              />
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1">{errors.subject[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Message <span className="text-pink-500">*</span>
              </label>
              <textarea
                name="message"
                value={fields.message}
                onChange={handleChange}
                placeholder="Décrivez votre projet (thème, couleurs, date souhaitée...)"
                rows={5}
                className={inputClass(errors.message)}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message[0]}</p>
              )}
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-sm text-center">
                Une erreur est survenue. Veuillez réessayer.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-pink-600 text-white font-semibold py-4 rounded-full hover:bg-pink-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default ContactSection
