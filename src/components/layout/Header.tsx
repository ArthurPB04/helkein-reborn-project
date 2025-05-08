
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Search } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be determined by auth context
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-helkein py-4 sticky top-0 z-50 shadow-md">
      <div className="container-helkein">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold font-heading text-helkein-text">
              Helkein<span className="text-helkein-accent">.</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="main-nav-link">Home</Link>
            <Link to="/blog" className="main-nav-link">Blog</Link>
            <Link to="/about" className="main-nav-link">Sobre</Link>
            <Link to="/contact" className="main-nav-link">Contato</Link>
          </nav>

          {/* Right side - Auth/Search */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-helkein-text hover:text-white p-2">
              <Search size={20} />
            </button>
            {isLoggedIn ? (
              <Link to="/profile" className="btn-primary">
                <User size={18} className="mr-1 inline" />
                <span>Perfil</span>
              </Link>
            ) : (
              <div className="space-x-2">
                <Link to="/login" className="btn-secondary">Entrar</Link>
                <Link to="/register" className="btn-primary">Registrar</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-helkein-text hover:text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="main-nav-link" onClick={toggleMenu}>Home</Link>
              <Link to="/blog" className="main-nav-link" onClick={toggleMenu}>Blog</Link>
              <Link to="/about" className="main-nav-link" onClick={toggleMenu}>Sobre</Link>
              <Link to="/contact" className="main-nav-link" onClick={toggleMenu}>Contato</Link>
              
              <div className="pt-2 border-t border-helkein-light">
                {isLoggedIn ? (
                  <Link to="/profile" className="btn-primary block text-center" onClick={toggleMenu}>Perfil</Link>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link to="/login" className="btn-secondary block text-center" onClick={toggleMenu}>Entrar</Link>
                    <Link to="/register" className="btn-primary block text-center" onClick={toggleMenu}>Registrar</Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
