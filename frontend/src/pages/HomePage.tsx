import React, { useState } from 'react';
import { 
  Search, MapPin, Home as HomeIcon, Star, ChevronRight, 
  Shield, Clock, Users, Award, Bed, Bath, Square, Heart, Mail
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('SALE');
  const [priceRange, setPriceRange] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      listingType: searchType,
      ...(searchLocation && { city: searchLocation }),
      ...(priceRange && { maxPrice: priceRange }),
    });
    navigate(`/properties?${params.toString()}`);
  };

  // Stats Data
  const stats = [
    { value: '15,000+', label: 'Houses Available' },
    { value: '12,000+', label: 'Houses Sold' },
    { value: '2,500+', label: 'Trusted Agents' },
  ];

  // Why Choose Us Features
  const features = [
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'End-to-end encrypted transactions with verified listings and trusted agents.',
    },
    {
      icon: Clock,
      title: 'Fast Process',
      description: 'Streamlined workflows that get you from search to closing in record time.',
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Dedicated team of real estate professionals ready to guide you.',
    },
    {
      icon: Award,
      title: 'Best Prices',
      description: 'Competitive pricing and exclusive deals you won\'t find anywhere else.',
    },
  ];

  // Featured Properties
  const featuredProperties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
      price: 425000,
      location: 'Beverly Hills, CA',
      beds: 4,
      baths: 3,
      sqft: 2044,
      favorite: false,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
      price: 750000,
      location: 'San Francisco, CA',
      beds: 3,
      baths: 2,
      sqft: 1680,
      favorite: false,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop',
      price: 625000,
      location: 'Los Angeles, CA',
      beds: 4,
      baths: 4,
      sqft: 2870,
      favorite: false,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop',
      price: 320000,
      location: 'Austin, TX',
      beds: 3,
      baths: 2,
      sqft: 1450,
      favorite: false,
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Los Angeles, CA',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b829?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Nest helped us find our dream home in just two weeks. The platform is intuitive and the agents are incredibly professional.',
    },
    {
      name: 'Michael Chen',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'As a first-time buyer, I was nervous about the process. Nest made everything simple and stress-free. Highly recommend!',
    },
    {
      name: 'Emily Rodriguez',
      location: 'Seattle, WA',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'The best real estate platform I\'ve used. Great selection of properties and excellent customer service throughout.',
    },
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
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-cream via-sand to-cream">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-black text-dark mb-6 leading-tight">
              Find Your Dream
              <span className="block mt-2">Home Today</span>
            </h1>
            <p className="text-xl text-dark-muted leading-relaxed">
              Discover the perfect property from thousands of listings across the country.
              Your next chapter starts here.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-5xl mx-auto animate-slide-up">
            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-large p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Location */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-dark mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-muted h-5 w-5" />
                    <input
                      type="text"
                      placeholder="City, ZIP..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-taupe transition-colors"
                    />
                  </div>
                </div>

                {/* Type */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-dark mb-2">Type</label>
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-taupe transition-colors bg-white"
                  >
                    <option value="SALE">For Sale</option>
                    <option value="RENT">For Rent</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-dark mb-2">Max Price</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-taupe transition-colors bg-white"
                  >
                    <option value="">Any</option>
                    <option value="300000">$300,000</option>
                    <option value="500000">$500,000</option>
                    <option value="750000">$750,000</option>
                    <option value="1000000">$1,000,000</option>
                    <option value="2000000">$2,000,000+</option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="md:col-span-1 flex items-end">
                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <Search className="h-5 w-5" />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Stats Row */}
          <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl font-black text-dark mb-2">{stat.value}</div>
                <div className="text-dark-muted font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-sand">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-header">Why Choose Us</h2>
            <p className="section-subtitle mx-auto">
              We provide the best service in the industry with features designed for your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-feature text-center group">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-dark" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{feature.title}</h3>
                <p className="text-dark-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Residences */}
      <section className="py-20 bg-cream">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-header">Popular Residences</h2>
              <p className="section-subtitle">
                Explore our handpicked selection of the finest properties available.
              </p>
            </div>
            <button
              onClick={() => navigate('/properties')}
              className="hidden md:flex items-center space-x-2 text-dark font-semibold hover:text-taupe transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <div
                key={property.id}
                className="property-card cursor-pointer"
                onClick={() => navigate(`/properties/${property.id}`)}
              >
                {/* Property Image */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={property.image}
                    alt={property.location}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  
                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Toggle favorite logic
                    }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-soft hover:shadow-medium transition-all"
                  >
                    <Heart className={`h-5 w-5 ${property.favorite ? 'fill-red-500 text-red-500' : 'text-dark-muted'}`} />
                  </button>

                  {/* Location Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white rounded-lg px-3 py-2 shadow-soft">
                    <MapPin className="h-4 w-4 text-dark-muted" />
                    <span className="text-sm font-medium text-dark">{property.location}</span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-dark">
                      {formatPrice(property.price)}
                    </h3>
                  </div>

                  {/* Property Stats */}
                  <div className="flex items-center space-x-4 text-dark-muted">
                    <div className="flex items-center space-x-1">
                      <Bed className="h-4 w-4" />
                      <span className="text-sm font-medium">{property.beds}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Bath className="h-4 w-4" />
                      <span className="text-sm font-medium">{property.baths}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Square className="h-4 w-4" />
                      <span className="text-sm font-medium">{formatNumber(property.sqft)} sqft</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full mt-6 btn-primary">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button Mobile */}
          <div className="mt-12 text-center md:hidden">
            <button
              onClick={() => navigate('/properties')}
              className="btn-outline flex items-center space-x-2 mx-auto"
            >
              <span>View All Properties</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-header">What Our Clients Say</h2>
            <p className="section-subtitle mx-auto">
              Real stories from real people who found their dream homes with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-cream rounded-xl p-8">
                {/* Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-dark fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-dark-muted leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-dark">{testimonial.name}</div>
                    <div className="text-sm text-dark-muted">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email CTA Section */}
      <section className="py-20 bg-taupe">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Mail className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Get Property Updates
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to receive the latest listings and market insights directly to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-dark text-white px-8 py-4 rounded-lg font-semibold hover:bg-dark-muted transition-colors shadow-soft"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* About */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <HomeIcon className="h-6 w-6" />
                <span className="text-xl font-bold">Nest</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted partner in finding the perfect home. Making dreams come true since 2024.
              </p>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            {/* Find Us */}
            <div>
              <h3 className="font-bold text-lg mb-4">Find Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Locations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partners</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Nest Real Estate Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
