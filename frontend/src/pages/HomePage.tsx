import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, Sparkles } from 'lucide-react';
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
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const featuredProperties = [
    {
      id: 1,
      price: 2850000,
      address: 'The Pinnacle Penthouse',
      city: 'Manhattan, NY 10022',
      beds: 4,
      baths: 4,
      sqft: 4200,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 2,
      price: 1650000,
      address: 'Coastal Modern Estate',
      city: 'Malibu, CA 90265',
      beds: 5,
      baths: 5,
      sqft: 5500,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 3,
      price: 3200000,
      address: 'Historic Brownstone',
      city: 'Brooklyn Heights, NY 11201',
      beds: 6,
      baths: 5,
      sqft: 6800,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80',
    },
    {
      id: 4,
      price: 1890000,
      address: 'Glass & Steel Masterpiece',
      city: 'Beverly Hills, CA 90210',
      beds: 4,
      baths: 5,
      sqft: 4800,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-primary-50 bg-noise">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-accent-50 to-primary-50 opacity-60"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-primary-200/50 mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 text-accent-600" />
              <span className="text-sm font-medium text-neutral-700 tracking-wide">Curated Luxury Homes</span>
            </div>

            {/* Main heading */}
            <h1 className="font-display text-display-2xl md:text-[6rem] text-neutral-900 mb-8 animate-slide-up leading-none">
              Discover Your
              <br />
              <span className="text-accent-600 italic">Perfect Sanctuary</span>
            </h1>

            <p className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Exceptional properties in the world's most coveted locations, 
              handpicked for the discerning buyer.
            </p>

            {/* Search Box */}
            <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <form onSubmit={handleSearch} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-elegant-xl border border-primary-100/50 p-3">
                <div className="flex flex-col md:flex-row gap-3">
                  {/* Search Type */}
                  <div className="flex gap-2 md:border-r border-primary-200 pr-3">
                    <button
                      type="button"
                      onClick={() => setSearchType('SALE')}
                      className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        searchType === 'SALE'
                          ? 'bg-accent-600 text-white shadow-md'
                          : 'text-neutral-600 hover:bg-primary-50'
                      }`}
                    >
                      Buy
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchType('RENT')}
                      className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        searchType === 'RENT'
                          ? 'bg-accent-600 text-white shadow-md'
                          : 'text-neutral-600 hover:bg-primary-50'
                      }`}
                    >
                      Rent
                    </button>
                  </div>

                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Location, neighborhood, or address"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-transparent text-neutral-900 placeholder-neutral-400 focus:outline-none text-lg"
                    />
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    className="group px-8 py-3 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                  >
                    <Search className="h-5 w-5" />
                    <span className="hidden sm:inline">Explore</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>

            {/* Quick stats */}
            <div className="flex items-center justify-center gap-12 mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div>
                <div className="text-3xl font-display text-neutral-900 mb-1">$2.4B+</div>
                <div className="text-sm text-neutral-600 tracking-wide uppercase">Properties Sold</div>
              </div>
              <div className="h-12 w-px bg-primary-200"></div>
              <div>
                <div className="text-3xl font-display text-neutral-900 mb-1">8,500+</div>
                <div className="text-sm text-neutral-600 tracking-wide uppercase">Happy Clients</div>
              </div>
              <div className="h-12 w-px bg-primary-200"></div>
              <div>
                <div className="text-3xl font-display text-neutral-900 mb-1">125+</div>
                <div className="text-sm text-neutral-600 tracking-wide uppercase">Cities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-neutral-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="relative py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-primary-100 rounded-full mb-6">
              <span className="text-sm font-medium text-accent-700 tracking-wide uppercase">Featured Collection</span>
            </div>
            <h2 className="font-display text-display-lg md:text-display-xl text-neutral-900 mb-6">
              Signature Properties
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Each residence tells a story of refined living, architectural excellence, and timeless elegance.
            </p>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProperties.map((property, index) => (
              <div
                key={property.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PropertyCard
                  {...property}
                  isFavorite={favorites.includes(property.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-16">
            <button
              onClick={() => navigate('/properties')}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-all duration-200 font-medium"
            >
              <span>View Full Collection</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-32 bg-primary-50 bg-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text */}
            <div>
              <div className="inline-block px-4 py-2 bg-white rounded-full mb-6">
                <span className="text-sm font-medium text-accent-700 tracking-wide uppercase">Concierge Service</span>
              </div>
              <h2 className="font-display text-display-lg text-neutral-900 mb-8">
                White-Glove
                <br />
                <span className="italic text-accent-600">Experience</span>
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                From initial consultation to final closing, our dedicated team provides personalized guidance every step of the way. We understand that finding your perfect home is more than a transaction—it's a journey.
              </p>
              <ul className="space-y-4 mb-12">
                {[
                  'Private viewings at your convenience',
                  'Detailed market analysis and insights',
                  'Negotiation expertise and advocacy',
                  'Seamless closing coordination'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-accent-600"></div>
                    </div>
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/register')}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-all duration-200 font-medium"
              >
                <span>Begin Your Journey</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Column - Image Composition */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-elegant-xl">
                <img
                  src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&h=750&fit=crop&q=80"
                  alt="Luxury Interior"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-elegant-xl p-6 max-w-xs">
                <div className="text-4xl font-display text-neutral-900 mb-2">98%</div>
                <div className="text-neutral-600">Client satisfaction rate from verified buyers and sellers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-display-lg md:text-display-xl mb-8">
            Ready to Find Your
            <br />
            <span className="italic text-accent-400">Dream Home?</span>
          </h2>
          <p className="text-xl text-neutral-300 mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied clients who've found their perfect property with NestHome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/properties')}
              className="px-8 py-4 bg-white text-neutral-900 rounded-xl hover:bg-neutral-100 transition-colors font-medium"
            >
              Explore Properties
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-accent-600 text-white rounded-xl hover:bg-accent-700 transition-colors font-medium"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
