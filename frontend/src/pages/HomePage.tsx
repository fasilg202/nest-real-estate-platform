import React, { useState } from 'react';
import { Search, MapPin, Home as HomeIcon } from 'lucide-react';
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
    // TODO: Wire to backend POST/DELETE /api/favorites/:id when user is authenticated
  };

  const featuredProperties = [
    {
      id: 1,
      price: 750000,
      address: '2314 N Jackson St',
      city: 'Hutchinson, KS 67502',
      beds: 3,
      baths: 2,
      sqft: 1680,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
    },
    {
      id: 2,
      price: 425000,
      address: '3321 Prairie Pkwy',
      city: 'Hutchinson, KS 67502',
      beds: 4,
      baths: 3,
      sqft: 2044,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    },
    {
      id: 3,
      price: 625000,
      address: '2319 W Main St',
      city: 'Hutchinson, KS 67502',
      beds: 4,
      baths: 4,
      sqft: 2870,
      image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&h=400&fit=crop',
    },
    {
      id: 4,
      price: 320000,
      address: '1205 E 4th Ave',
      city: 'Hutchinson, KS 67501',
      beds: 3,
      baths: 2,
      sqft: 1450,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop',
    },
  ];



  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-neutral-50 to-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
              Find Your Dream Home
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Search millions of for-sale and rental listings, compare home values and connect with local professionals.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-2">
              <div className="flex flex-col md:flex-row gap-2">
                {/* Search Type Tabs */}
                <div className="flex border-b md:border-b-0 md:border-r border-neutral-200">
                  <button
                    type="button"
                    onClick={() => setSearchType('SALE')}
                    className={`flex-1 md:flex-none px-6 py-3 text-sm font-medium transition-colors ${
                      searchType === 'SALE'
                        ? 'text-primary-600 border-b-2 md:border-b-0 md:border-r-2 border-primary-600'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchType('RENT')}
                    className={`flex-1 md:flex-none px-6 py-3 text-sm font-medium transition-colors ${
                      searchType === 'RENT'
                        ? 'text-primary-600 border-b-2 md:border-b-0 md:border-r-2 border-primary-600'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Rent
                  </button>
                </div>

                {/* Search Input */}
                <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Enter an address, neighborhood, city, or ZIP code"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 text-neutral-900 placeholder-neutral-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium flex items-center gap-2"
                  >
                    <Search className="h-5 w-5" />
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                Homes For You
              </h2>
              <p className="text-neutral-600">
                Based on your preferences and search history
              </p>
            </div>
            <button
              onClick={() => navigate('/properties')}
              className="text-primary-600 hover:text-primary-700 font-medium hidden md:block"
            >
              See all →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                price={property.price}
                address={property.address}
                city={property.city}
                beds={property.beds}
                baths={property.baths}
                sqft={property.sqft}
                image={property.image}
                isFavorite={favorites.includes(property.id)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <button
              onClick={() => navigate('/properties')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              See all properties →
            </button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Whether you're buying, selling or renting, we can help you move forward.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Buy a home
              </h3>
              <p className="text-neutral-600 mb-4">
                With over 1 million+ homes for sale available on the website, we can match you with a house you will want to call home.
              </p>
              <button
                onClick={() => navigate('/properties?listingType=SALE')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Find a home →
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <HomeIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Sell a home
              </h3>
              <p className="text-neutral-600 mb-4">
                No matter what path you take to sell your home, we can help you navigate a successful sale.
              </p>
              <button
                onClick={() => navigate('/dashboard/add-property')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                See your options →
              </button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Rent a home
              </h3>
              <p className="text-neutral-600 mb-4">
                We're creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.
              </p>
              <button
                onClick={() => navigate('/properties?listingType=RENT')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Find rentals →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Create an account to save your favorite homes and get personalized recommendations.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-neutral-50 transition-colors font-medium text-lg"
          >
            Sign Up Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
