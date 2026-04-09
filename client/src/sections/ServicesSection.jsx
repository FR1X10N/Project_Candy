const services = [
  {
    emoji: '🎂',
    title: 'Anniversaires',
    description:
      "Des gâteaux de bonbons aux couleurs de votre choix pour des anniversaires inoubliables, pour enfants comme pour adultes.",
  },
  {
    emoji: '💍',
    title: 'Mariages',
    description:
      "Des pièces élégantes et raffinées qui s'intègrent parfaitement à la décoration de votre mariage.",
  },
  {
    emoji: '🎉',
    title: 'Événements',
    description:
      "Baby shower, baptême, fête d'entreprise... Nous créons des gâteaux de bonbons adaptés à toutes les occasions.",
  },
  {
    emoji: '🎁',
    title: 'Cadeaux',
    description:
      "Offrez un cadeau original et gourmand, personnalisé aux couleurs et aux goûts de la personne à qui vous l'offrez.",
  },
]

const ServicesSection = () => (
  <section id="services" className="py-24 bg-pink-50">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-pink-600 font-semibold text-sm uppercase tracking-widest mb-3">
          Nos créations
        </p>
        <h2 className="text-4xl font-extrabold text-gray-900">
          Pour chaque occasion
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map(({ emoji, title, description }) => (
          <div
            key={title}
            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <p className="text-4xl mb-4">{emoji}</p>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default ServicesSection
