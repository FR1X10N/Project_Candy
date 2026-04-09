const Navbar = () => {
  const links = [
    { label: 'Accueil', href: '#hero' },
    { label: 'À propos', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-pink-100">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold text-pink-600">
          🍬 Project Candy
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-gray-600 hover:text-pink-600 transition-colors text-sm font-medium"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="bg-pink-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-pink-700 transition-colors"
        >
          Commander
        </a>
      </nav>
    </header>
  )
}

export default Navbar
