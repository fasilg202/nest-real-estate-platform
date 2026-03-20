import React, { useState } from 'react';
import { Search, MapPin, Home as HomeIcon, Award, Users, TrendingUp, CheckCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('House');
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      ...(searchQuery && { city: searchQuery }),
      ...(selectedCategory && { propertyType: selectedCategory.toUpperCase() }),
    });
    navigate(`/properties?${params.toString()}`);
  };

  const handleFavoriteToggle = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const categories = ['House', 'Apartment', 'Villa', 'Office'];

  const featuredProperties = [
    {
      id: 1,
      price: 590000,
      address: 'Sunset Paradise',
      city: '103 Wright CourtBurien, WA 98168',
      beds: 4,
      baths: 3,
      sqft: 2500,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
      tag: 'Featured',
    },
    {
      id: 2,
      price: 420000,
      address: 'Wayside Modern House',
      city: '103 Wright CourtBurien, WA 98168',
      beds: 3,
      baths: 2,
      sqft: 1850,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
      tag: 'New Listing',
    },
    {
      id: 3,
      price: 850000,
      address: 'Sunset Paradise',
      city: '103 Wright CourtBurien, WA 98168',
      beds: 5,
      baths: 4,
      sqft: 3200,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
      tag: 'Featured',
    },
  ];

  const features = [
    {
      icon: Award,
      title: 'Premium Property Listings',
      description: 'Discover an array of handpicked properties that meet the highest standards of quality and comfort.',
    },
    {
      icon: Users,
      title: 'Personalized Property Matching',
      description: 'Our advanced matching system pairs you with properties that align with your specific needs and desires.',
    },
    {
      icon: TrendingUp,
      title: 'Expert Guidance and Support',
      description: 'Benefit from the expertise of our dedicated team of real estate professionals.',
    },
    {
      icon: CheckCircle,
      title: 'Virtual Tours',
      description: 'Take advantage of our cutting-edge virtual tours to explore properties from the comfort of your home.',
    },
  ];

  const testimonials = [
    {
      name: 'Tony Stark',
      role: 'Marketing Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      text: 'Thank you for guiding us through the construction process, understanding, and always ready to accommodate our needs. We love our new space and know that it was built by the very best!',
      rating: 5,
    },
    {
      name: 'John Doe',
      role: 'Product Designer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      text: 'Thank you for guiding us through the construction process, understanding, and always ready to accommodate our needs. We love our new space!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark-900/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Dream Home
            </h1>
            <p className="text-xl text-white/90 mb-12">
              Explore our range of beautiful properties with the addition of separate accommodation suitable for you.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="bg-white rounded-xl p-2 shadow-xl">
              <div className="flex flex-col md:flex-row gap-2">
                {/* Location Input */}
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Enter an address, city or Zip code"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-dark-900 placeholder-dark-400 focus:outline-none rounded-lg"
                  />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </div>

              {/* Categories */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-dark-100 text-dark-700 hover:bg-dark-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-dark-900 mb-3">
                Featured Property
              </h2>
              <p className="text-lg text-dark-600">
                Handpicked properties by our team
              </p>
            </div>
            <button
              onClick={() => navigate('/properties')}
              className="text-primary-600 hover:text-primary-700 font-medium hidden md:block"
            >
              See more →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                isFavorite={favorites.includes(property.id)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-dark-600 max-w-2xl mx-auto">
              We provide full service at every step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-dark-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-dark-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-900 mb-4">
              Loved By Over 50,000 Customers
            </h2>
            <p className="text-lg text-dark-600">
              What our happy clients say about us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-dark-50 rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-dark-900">{testimonial.name}</h4>
                    <p className="text-sm text-dark-600">{testimonial.role}</p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-dark-700 leading-relaxed">
                  {testimonial.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
