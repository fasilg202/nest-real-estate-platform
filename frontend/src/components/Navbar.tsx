import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, User, LogOut, Menu, X, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/properties?listingType=SALE', label: 'Buy' },
    { path: '/properties?listingType=RENT', label: 'Rent' },
    { path: '/properties', label: 'Properties' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-dark-900">DreamHome</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium transition-colors ${
                  isActive(link.path) ? 'text-primary-600' : 'text-dark-700 hover:text-primary-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard/add-property"
                  className="flex items-center space-x-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  <Plus className="h-4 w-4" />
                  <span>List Property</span>
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-10 h-10 bg-dark-100 rounded-full flex items-center justify-center hover:bg-dark-200 transition-colors"
                  >
                    <span className="text-dark-700 font-semibold">
                      {(user.firstName && user.firstName.trim()) ? user.firstName.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-dark-100">
                      <div className="p-4 border-b border-dark-100">
                        <p className="font-semibold text-dark-900">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-dark-600">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-2.5 text-dark-700 hover:bg-dark-50 transition-colors"
                        >
                          <User className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="px-5 py-2.5 text-dark-700 hover:text-primary-600 font-medium">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-dark-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-dark-100">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg font-medium ${
                  isActive(link.path) ? 'bg-primary-50 text-primary-600' : 'text-dark-700 hover:bg-dark-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <div className="border-t border-dark-100 my-4"></div>
                <Link
                  to="/dashboard/add-property"
                  className="flex items-center space-x-3 px-4 py-3 bg-primary-600 text-white rounded-lg"
                >
                  <Plus className="h-5 w-5" />
                  <span>List Property</span>
                </Link>
                <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-dark-700 hover:bg-dark-50 rounded-lg">
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-dark-100 my-4"></div>
                <Link to="/login" className="block px-4 py-3 text-dark-700 hover:bg-dark-50 rounded-lg">
                  Sign In
                </Link>
                <Link to="/register" className="block px-4 py-3 bg-primary-600 text-white rounded-lg text-center">
                  Sign Up
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
