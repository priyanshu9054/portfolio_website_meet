import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'Projects', path: '/projects' },
    { label: 'About Me', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] border-b border-white/10 bg-[#0d1117]/80 backdrop-blur-xl shadow-lg shadow-black/20">
      <div className="max-w-[1400px] mx-auto px-8 h-24 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 relative">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#3b82f6]">
              <path d="M12 8C12 8 8 12 8 20C8 28 12 32 12 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M20 8V32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M28 8C28 8 32 12 32 20C32 28 28 32 28 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tighter uppercase hidden md:block text-white group-hover:tracking-widest transition-all duration-500">Meet</span>
        </Link>

        {/* Center Navigation - Navy text with blue hover */}
        <div className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `
                text-[11px] font-medium uppercase tracking-[0.2em] transition-all hover:text-[#2563eb]
                ${isActive ? 'text-[#3b82f6]' : 'text-white/70'}
              `}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right Action - Navy CTA button */}
        <div className="flex items-center">
          <a
            href="https://www.linkedin.com/in/meetkumar-doshi"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-[#0a192f] border border-[#0a192f] rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#1e3a5f] hover:border-[#1e3a5f] transition-all duration-500 shadow-xl shadow-[#0a192f]/30 text-white"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
