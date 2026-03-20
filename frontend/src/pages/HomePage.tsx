import React, { useState } from 'react';
import { Search, MapPin, TrendingUp, Shield, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'SALE' | 'RENT'>('SALE');
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      listingType: searchType,
      ...(searchQuery && { city: searchQuery }),
    });
    navigate(`/properties?${params.toString()}`);
  };

  const handleFavoriteToggle = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const featuredProperties = [
    {
      id: 1,
      price: 850000,
      address: '2314 N Jackson St',
      city: 'San Francisco, CA',
      beds: 3,
      baths: 2,
      sqft: 2100,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
    },
    {
      id: 2,
      price: 650000,
      address: '1842 Oak Avenue',
      city: 'Los Angeles, CA',
      beds: 4,
      baths: 3,
      sqft: 2400,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    },
    {
      id: 3,
      price: 725000,
      address: '928 Pine Street',
      city: 'Seattle, WA',
      beds: 3,
      baths: 2.5,
      sqft: 1950,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
    },
    {
      id: 4,
      price: 580000,
      address: '456 Maple Drive',
      city: 'Portland, OR',
      beds: 3,
      baths: 2,
      sqft: 1800,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-50 via-white to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-dark-900 mb-6 leading-tight">
              Find Your Dream Home
            </h1>
            <p className="text-xl text-dark-600 leading-relaxed">
              Discover the perfect property from our extensive collection of homes for sale and rent
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-soft p-2">
              <div className="flex flex-col md:flex-row gap-2">
                {/* Search Type */}
                <div className="flex gap-2 md:border-r border-dark-200 pr-3">
                  <button
                    type="button"
                    onClick={() => setSearchType('SALE')}
                    className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${
                      searchType === 'SALE'
                        ? 'bg-primary-600 text-white'
                        : 'text-dark-600 hover:bg-dark-50'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchType('RENT')}
                    className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${
                      searchType === 'RENT'
                        ? 'bg-primary-600 text-white'
                        : 'text-dark-600 hover:bg-dark-50'
                    }`}
                  >
                    Rent
                  </button>
                </div>

                {/* Search Input */}
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="City, neighborhood, or ZIP code"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 text-dark-900 placeholder-dark-400 focus:outline-none"
                  />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-sm text-dark-600">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">8.5K+</div>
              <div className="text-sm text-dark-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">125+</div>
              <div className="text-sm text-dark-600">Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-dark-600">
              Explore our handpicked selection of premium properties
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                isFavorite={favorites.includes(property.id)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/properties')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium"
            >
              <span>View All Properties</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-dark-600">
              We make finding your dream home simple and stress-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-soft">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-3">
                Trusted Platform
              </h3>
              <p className="text-dark-600 leading-relaxed">
                Over 10,000 verified properties with transparent pricing and detailed information
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-soft">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-3">
                Secure Transactions
              </h3>
              <p className="text-dark-600 leading-relaxed">
                Your data and transactions are protected with industry-leading security measures
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-soft">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-3">
                Expert Support
              </h3>
              <p className="text-dark-600 leading-relaxed">
                Our experienced team is here to guide you through every step of your journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of happy homeowners who found their perfect property
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-white text-primary-600 rounded-xl hover:bg-primary-50 transition-colors font-medium text-lg"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
