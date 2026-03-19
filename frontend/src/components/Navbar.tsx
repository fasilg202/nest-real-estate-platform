import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, User, LogOut, Menu, X, Plus, Heart, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/properties', label: 'Buy' },
    { path: '/properties?listingType=RENT', label: 'Rent' },
    { path: '/sell', label: 'Sell' },
    { path: '/mortgage', label: 'Mortgage' },
    { path: '/agents', label: 'Agents' },
  ];

  const secondaryLinks = [
    { path: '/manage-rentals', label: 'Manage Rentals' },
    { path: '/advertise', label: 'Advertise' },
    { path: '/help', label: 'Help' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-xl border-b' : 'backdrop-blur-sm'
      }`}
      style={{
        backgroundColor: isScrolled 
          ? 'rgba(30, 30, 42, 0.95)' 
          : 'rgba(10, 10, 15, 0.5)',
        borderBottomColor: isScrolled ? '#15151D' : 'transparent'
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="relative">
              <Home className="h-8 w-8 text-accent group-hover:text-accent-dark transition-colors" />
              <div className="absolute -inset-1 bg-accent/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-2xl font-bold gradient-text">
              Nest
            </span>
          </Link>

          {/* Desktop Navigation - Main Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${
                  isActive(link.path) ? 'nav-link-active' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Navigation - Secondary Links */}
          <div className="hidden xl:flex items-center space-x-6">
            {secondaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm text-gray-400 hover:text-accent transition-colors ${
                  isActive(link.path) ? 'text-accent' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Add Property Button */}
                <Link
                  to="/dashboard/add-property"
                  className="btn-outline btn-sm flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>List Property</span>
                </Link>

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-3 p-2 rounded-xl hover:bg-dark-surface transition-colors">
                    <div className="w-8 h-8 bg-dark-surface rounded-full flex items-center justify-center border border-accent/20">
                      <span className="text-accent text-sm font-semibold">
                        {user.firstName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-200 font-medium">{user.firstName}</span>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-56 bg-dark-surface rounded-xl shadow-xl border border-dark-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                    <div className="p-4 border-b border-dark-border">
                      <p className="font-semibold text-gray-200">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-dark-surface-light rounded-xl transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/favorites"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-dark-surface-light rounded-xl transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        <span>Favorites</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="btn-secondary btn-sm"
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
            className="md:hidden p-2 rounded-xl hover:bg-dark-surface transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-400" />
            ) : (
              <Menu className="h-6 w-6 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${
        isMenuOpen 
          ? 'max-h-screen opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-dark-surface border-t border-dark-border">
          <div className="px-4 py-4 space-y-2">
            {/* Main Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-xl transition-colors ${
                  isActive(link.path) 
                    ? 'bg-dark-surface-light text-accent' 
                    : 'text-gray-300 hover:bg-dark-surface-light'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}

            {/* Secondary Navigation Links */}
            <div className="border-t border-dark-border my-4"></div>
            {secondaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive(link.path) 
                    ? 'bg-dark-surface-light text-accent' 
                    : 'text-gray-300 hover:bg-dark-surface-light'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.path === '/help' && <HelpCircle className="h-5 w-5" />}
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}

            {user ? (
              <>
                <div className="border-t border-dark-border my-4"></div>
                <Link
                  to="/dashboard/add-property"
                  className="flex items-center space-x-3 px-4 py-3 text-accent hover:bg-dark-surface-light rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Plus className="h-5 w-5" />
                  <span className="font-medium">List Property</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-dark-surface-light rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-dark-surface-light rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">Favorites</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-dark-border my-4"></div>
                <Link
                  to="/login"
                  className="block px-4 py-3 text-gray-300 hover:bg-dark-surface-light rounded-xl transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-3 bg-accent text-dark-bg hover:bg-accent-dark rounded-xl transition-colors font-medium text-center shadow-neon"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 