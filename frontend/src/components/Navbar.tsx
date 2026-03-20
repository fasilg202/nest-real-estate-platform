import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, User, LogOut, Menu, X, Plus, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/properties', label: 'Buy', query: '' },
    { path: '/properties', label: 'Rent', query: '?listingType=RENT' },
    { path: '/agents', label: 'Find Agents' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-medium' 
          : 'bg-white bg-opacity-95'
      }`}
    >
      <div className="container">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <Home className="h-8 w-8 text-dark transition-colors" />
            </div>
            <span className="text-2xl font-black text-dark">
              Nest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={`${link.path}${link.query}`}
                to={`${link.path}${link.query || ''}`}
                className={`nav-link ${
                  (isActive(link.path) && (!link.query || location.search === link.query))
                    ? 'nav-link-active' 
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                {/* List Property Button */}
                <Link
                  to="/dashboard/add-property"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-dark-muted hover:text-dark transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>List Property</span>
                </Link>

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-cream transition-colors">
                    <div className="w-8 h-8 bg-taupe rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user.firstName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-dark font-medium hidden xl:block">
                      {user.firstName || 'User'}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-large border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-semibold text-dark">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-dark-muted">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 text-dark-muted hover:bg-cream rounded-lg transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/favorites"
                        className="flex items-center space-x-3 px-4 py-3 text-dark-muted hover:bg-cream rounded-lg transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        <span>Favorites</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-dark-muted hover:text-dark transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary btn-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-cream transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-dark" />
            ) : (
              <Menu className="h-6 w-6 text-dark" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container py-4 space-y-2">
            {/* Main Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={`${link.path}${link.query}`}
                to={`${link.path}${link.query || ''}`}
                className={`block px-4 py-3 rounded-lg transition-colors font-medium ${
                  (isActive(link.path) && (!link.query || location.search === link.query))
                    ? 'bg-sand text-dark' 
                    : 'text-dark-muted hover:bg-cream'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <div className="border-t border-gray-100 my-4"></div>
                <Link
                  to="/dashboard/add-property"
                  className="flex items-center space-x-3 px-4 py-3 text-dark hover:bg-cream rounded-lg transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span className="font-medium">List Property</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-3 px-4 py-3 text-dark-muted hover:bg-cream rounded-lg transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center space-x-3 px-4 py-3 text-dark-muted hover:bg-cream rounded-lg transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">Favorites</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-gray-100 my-4"></div>
                <Link
                  to="/login"
                  className="block px-4 py-3 text-dark-muted hover:bg-cream rounded-lg transition-colors font-medium text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-3 bg-dark text-white hover:bg-dark-muted rounded-lg transition-colors font-medium text-center shadow-soft"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
