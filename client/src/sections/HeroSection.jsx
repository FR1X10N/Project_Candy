const HeroSection = () => (
  <section
    id="hero"
    className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100 pt-20"
  >
    <div className="max-w-3xl mx-auto px-6 text-center">
      <p className="text-5xl mb-6">🍰</p>
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
        Des gâteaux de bonbons{' '}
        <span className="text-pink-600">qui font rêver</span>
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto">
        Créations sucrées sur mesure pour vos anniversaires, mariages et événements.
        Chaque pièce est unique et fabriquée avec amour.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#services"
          className="bg-pink-600 text-white font-semibold px-8 py-4 rounded-full hover:bg-pink-700 transition-colors text-lg"
        >
          Découvrir nos créations
        </a>
        <a
          href="#contact"
          className="border-2 border-pink-600 text-pink-600 font-semibold px-8 py-4 rounded-full hover:bg-pink-50 transition-colors text-lg"
        >
          Passer une commande
        </a>
      </div>
    </div>
  </section>
)

export default HeroSection
