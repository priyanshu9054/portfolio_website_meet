
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'Projects', path: '/projects' },
    { label: 'About Me', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] border-b border-white/5 bg-[#003057]/40 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-8 h-24 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 relative">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
              <path d="M12 8C12 8 8 12 8 20C8 28 12 32 12 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M20 8V32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M28 8C28 8 32 12 32 20C32 28 28 32 28 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tighter uppercase hidden md:block group-hover:tracking-widest transition-all duration-500">Meet</span>
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `
                text-[11px] font-medium uppercase tracking-[0.2em] transition-all hover:text-white
                ${isActive ? 'text-white' : 'text-white/40'}
              `}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right Action */}
        <div className="flex items-center">
          <a
            href="https://www.linkedin.com/in/meetkumar-doshi"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 border border-[#A4925A]/40 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#A4925A] hover:text-white transition-all duration-500 shadow-xl shadow-[#A4925A]/5"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
