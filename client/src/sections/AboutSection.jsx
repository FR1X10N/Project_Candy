const AboutSection = () => (
  <section id="about" className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-pink-600 font-semibold text-sm uppercase tracking-widest mb-3">
            À propos
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Une passion pour la confiserie artisanale
          </h2>
          <p className="text-gray-600 text-lg mb-4 leading-relaxed">
            Depuis plusieurs années, nous créons des gâteaux de bonbons uniques qui
            combinent l'art de la confiserie et la magie de la décoration. Chaque
            création est pensée pour émerveiller petits et grands.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Nous utilisons uniquement des bonbons de qualité et personnalisons chaque
            pièce selon vos envies : couleurs, thèmes, tailles... Rien n'est impossible !
          </p>
        </div>
        <div className="bg-pink-50 rounded-3xl p-12 text-center">
          <div className="grid grid-cols-2 gap-8">
            {[
              { value: '200+', label: 'Créations réalisées' },
              { value: '100%', label: 'Fait main' },
              { value: '5★', label: 'Avis clients' },
              { value: '48h', label: 'Délai moyen' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-extrabold text-pink-600 mb-1">{value}</p>
                <p className="text-gray-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default AboutSection
