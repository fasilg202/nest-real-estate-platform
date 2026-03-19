import React, { useState, useEffect } from 'react';
import { Search, MapPin, Home, TrendingUp, Star, ChevronRight, Shield, Clock, Users, Bed, Bath, Square, Heart, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('SALE');
  const [isVisible, setIsVisible] = useState(false);
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-scroll trending homes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrendingIndex((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      listingType: searchType,
      ...(searchQuery && { city: searchQuery }),
    });
    navigate(`/properties?${params.toString()}`);
  };

  const featuredStats = [
    { icon: Home, label: 'Properties Listed', value: '50,000+' },
    { icon: MapPin, label: 'Cities Covered', value: '100+' },
    { icon: TrendingUp, label: 'Happy Customers', value: '25,000+' },
    { icon: Star, label: 'Average Rating', value: '4.9/5' },
  ];

  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Advanced AI-powered search with intelligent filters to find your perfect home in seconds.',
    },
    {
      icon: Shield,
      title: 'Verified Listings',
      description: 'Every property is verified for authenticity, ensuring you see only genuine listings.',
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Get instant notifications for new listings and price changes in your areas of interest.',
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Connect with experienced real estate professionals for personalized guidance.',
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'First-time Buyer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b829?w=150&h=150&fit=crop&crop=face',
      content: 'Nest made finding my dream home incredibly easy. The search filters are intuitive and the support team was amazing!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Property Investor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'As an investor, I need reliable data and quick access to new listings. Nest delivers on both fronts perfectly.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Realtor',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: 'The platform has revolutionized how I work with clients. The tools are professional and user-friendly.',
      rating: 5
    }
  ];

  const popularCities = [
    { name: 'San Francisco', properties: '12,450', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop' },
    { name: 'New York', properties: '23,100', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=200&fit=crop' },
    { name: 'Los Angeles', properties: '18,200', image: 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=300&h=200&fit=crop' },
    { name: 'Chicago', properties: '9,800', image: 'https://images.unsplash.com/photo-1494522358652-f30e61a5328d?w=300&h=200&fit=crop' }
  ];

  const trendingHomes = [
    {
      id: 1,
      price: 750000,
      address: '2314 N Jackson St, Hutchinson, KS, 67502',
      beds: 3,
      baths: 2,
      sqft: 1680,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop',
      status: 'Active',
      timePosted: '11 hours ago',
      priceChange: null,
      favorite: false
    },
    {
      id: 2,
      price: 425000,
      address: '3321 Prairie Pkwy, Hutchinson, KS, 67502',
      beds: 4,
      baths: 3,
      sqft: 2044,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      status: 'Active',
      timePosted: '12 hours ago',
      priceChange: { type: 'cut', amount: 7500 },
      favorite: false
    },
    {
      id: 3,
      price: 625000,
      address: '2319 W Main St, Hutchinson, KS, 67502',
      beds: 4,
      baths: 4,
      sqft: 2870,
      image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=400&h=300&fit=crop',
      status: 'Active',
      timePosted: '1 day ago',
      priceChange: null,
      favorite: false
    },
    {
      id: 4,
      price: 320000,
      address: '1205 E 4th Ave, Hutchinson, KS, 67501',
      beds: 3,
      baths: 2,
      sqft: 1450,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop',
      status: 'Active',
      timePosted: '2 days ago',
      priceChange: { type: 'cut', amount: 5000 },
      favorite: false
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#0A0A0F'}}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center dark-gradient dark-pattern overflow-hidden">
        <div className="absolute inset-0" style={{backgroundColor: 'rgba(10, 10, 15, 0.5)'}}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-accent/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="relative container py-20">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-100 mb-8 leading-tight">
              Find Your
              <span className="block gradient-text">
                Dream Home
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover exceptional properties with our advanced search technology. 
              From cozy apartments to luxury estates, your perfect home awaits.
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className={`max-w-5xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <form onSubmit={handleSearch} className="glass-dark rounded-2xl shadow-xl p-8">
              <div className="flex flex-col lg:flex-row gap-6 items-end">
                {/* Search Type Toggle */}
                <div className="lg:w-auto">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">I want to</label>
                  <div className="flex rounded-xl p-1.5" style={{backgroundColor: '#0A0A0F'}}>
                    {['SALE', 'RENT'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSearchType(type)}
                        className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                          searchType === type
                            ? 'bg-accent text-dark shadow-neon'
                            : 'text-gray-400 hover:text-accent'
                        }`}
                      >
                        {type === 'SALE' ? 'Buy' : 'Rent'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Input */}
                <div className="flex-1 lg:min-w-0">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Enter city, neighborhood, or zip code"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input-field pl-12"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-3 group"
                >
                  <Search className="h-5 w-5" />
                  Search Properties
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>

          {/* Quick Stats */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {featuredStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="glass-dark rounded-xl p-6 hover:border-accent/30 transition-all duration-300">
                  <div className="bg-accent/10 rounded-lg p-3 mb-4 w-fit mx-auto">
                    <stat.icon className="h-8 w-8 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-gray-100 mb-2">{stat.value}</div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Homes Section */}
      <section className="py-24 bg-surface">
        <div className="container">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Trending Homes in Hutchinson, KS
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl">
                Viewed and saved the most in the area over the past 24 hours
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setCurrentTrendingIndex((prev) => (prev - 1 + trendingHomes.length) % trendingHomes.length)}
                className="p-3 rounded-xl bg-dark-surface border border-dark-border hover:border-accent/30 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-400" />
              </button>
              <button 
                onClick={() => setCurrentTrendingIndex((prev) => (prev + 1) % trendingHomes.length)}
                className="p-3 rounded-xl bg-dark-surface border border-dark-border hover:border-accent/30 transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingHomes.map((home, index) => (
              <div 
                key={home.id} 
                className={`group cursor-pointer transition-all duration-500 transform ${
                  index === currentTrendingIndex ? 'scale-105 z-10' : ''
                }`}
                onClick={() => navigate(`/property/${home.id}`)}
              >
                <div className="card overflow-hidden hover:shadow-neon transition-all duration-300">
                  {/* Property Image */}
                  <div className="relative">
                    <img 
                      src={home.image} 
                      alt={home.address}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      {home.timePosted && (
                        <span className="bg-accent text-dark-bg px-3 py-1 rounded-full text-sm font-semibold">
                          {home.timePosted}
                        </span>
                      )}
                    </div>

                    {/* Price Cut Badge */}
                    {home.priceChange && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Price cut: ${formatNumber(home.priceChange.amount)}
                        </span>
                      </div>
                    )}

                    {/* Favorite Button */}
                    <button 
                      className="absolute bottom-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Toggle favorite logic here
                      }}
                    >
                      <Heart className={`h-5 w-5 ${home.favorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                    </button>
                  </div>

                  {/* Property Details */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-100 mb-2">
                        {formatPrice(home.price)}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {home.address}
                      </p>
                    </div>

                    {/* Property Features */}
                    <div className="flex items-center space-x-6 text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Bed className="h-4 w-4" />
                        <span className="text-sm">{home.beds} beds</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bath className="h-4 w-4" />
                        <span className="text-sm">{home.baths} baths</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Square className="h-4 w-4" />
                        <span className="text-sm">{formatNumber(home.sqft)} sqft</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-dark-border">
                      <span className="text-sm text-gray-400">{home.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/properties')}
              className="btn-outline flex items-center gap-3 mx-auto group"
            >
              View All Properties
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24" style={{backgroundColor: '#0A0A0F'}}>
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Why Choose Nest?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We combine cutting-edge technology with personalized service to make your real estate journey seamless and successful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="card p-8 hover:shadow-neon transition-all duration-300">
                  <div className="bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-100 mb-4">{feature.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-24 bg-surface">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Explore Popular Cities
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover amazing properties in the most sought-after locations across the country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularCities.map((city, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => navigate(`/properties?city=${city.name}`)}>
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={city.image} 
                    alt={city.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 transition-colors duration-300" style={{
                    background: 'linear-gradient(to top, #0A0A0F, transparent, transparent)'
                  }}></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
                    <p className="text-gray-200">{city.properties} properties</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{backgroundColor: '#0A0A0F'}}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what real clients have to say about their experience with Nest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-8 hover:shadow-neon transition-all duration-300">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 ring-2 ring-accent/20"
                  />
                  <div>
                    <h4 className="font-bold text-gray-100">{testimonial.name}</h4>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 italic leading-relaxed">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 dark-gradient dark-pattern overflow-hidden">
        <div className="absolute inset-0" style={{backgroundColor: 'rgba(10, 10, 15, 0.5)'}}></div>
        <div className="relative container text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-100 mb-8">
            Ready to Find Your 
            <span className="block gradient-text">Perfect Home?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join thousands of satisfied customers who found their dream properties with Nest. 
            Start your journey today and discover what makes us different.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => navigate('/properties')}
              className="btn-primary"
            >
              Start Your Search
            </button>
            <button
              onClick={() => navigate('/register')}
              className="btn-secondary"
            >
              Join Nest Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 