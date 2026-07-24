"use client";

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      {/* Logo / title — opens main site in new tab */}
      <a
        href="https://pdcyes.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2"
      >
        <span className="text-2xl font-bold tracking-tight text-primary">PDCYES</span>
      </a>

      <nav className="flex space-x-6 text-sm font-medium text-gray-600">
        {/* Home → main site */}
        <a
          href="https://pdcyes.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          Home
        </a>
        {/* Events → this subdomain */}
        <a
          href="https://events.pdcyes.com/"
          className="hover:text-primary transition-colors"
        >
          Events
        </a>
        {/* About → main site */}
        <a
          href="https://pdcyes.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          About
        </a>
        {/* Join Us → main site */}
        <a
          href="https://pdcyes.com/join-us"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          Join Us
        </a>
      </nav>
    </header>
  );
}