import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Grid, 
  List, 
  SlidersHorizontal,
  ArrowUpDown,
  DollarSign
} from 'lucide-react';
import axios from 'axios';

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  propertyType: string;
  listingType: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  images: Array<{ url: string; caption?: string }>;
  features: string[];
  status: string;
  createdAt: string;
}

const PropertyListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const navigate = useNavigate();

  const LIMIT = 20;

  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    listingType: searchParams.get('listingType') || '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    sortBy: 'newest'
  });

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  const fetchProperties = async (append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setOffset(0);
    }

    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value && key !== 'sortBy') params.append(key, value);
      });

      params.append('limit', LIMIT.toString());
      params.append('offset', (append ? offset : 0).toString());

      const response = await axios.get(`/properties?${params.toString()}`);
      const { properties: newProperties, total: newTotal, hasMore: newHasMore } = response.data;

      if (append) {
        setProperties(prev => [...prev, ...newProperties]);
        setOffset(prev => prev + newProperties.length);
      } else {
        setProperties(newProperties);
        setOffset(newProperties.length);
      }

      setTotal(newTotal);
      setHasMore(newHasMore);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchProperties(true);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== 'sortBy') params.append(key, value);
    });
    setSearchParams(params);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      listingType: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      sortBy: 'newest'
    });
    setSearchParams(new URLSearchParams());
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const formatPrice = (price: number, listingType: string) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
    
    return listingType === 'RENT' ? `${formatted}/month` : formatted;
  };

  const getPropertyTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      'HOUSE': 'House',
      'APARTMENT': 'Apartment',
      'CONDO': 'Condo',
      'TOWNHOUSE': 'Townhouse',
      'LOFT': 'Loft',
      'STUDIO': 'Studio',
      'DUPLEX': 'Duplex',
      'MOBILE_HOME': 'Mobile Home',
      'LAND': 'Land',
      'COMMERCIAL': 'Commercial'
    };
    return types[type] || type;
  };

  const PropertyCard: React.FC<{ property: Property; isListView?: boolean }> = ({ property, isListView = false }) => {
    const isFavorite = favorites.includes(property._id);
    
    if (isListView) {
      return (
        <div className="card hover:shadow-neon transition-all duration-300">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-80 h-64 lg:h-auto relative">
              <img
                src={property.images[0]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'}
                alt={property.title}
                className="w-full h-full object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-t-none"
              />
              <button
                onClick={() => toggleFavorite(property._id)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 ${
                  isFavorite ? 'bg-accent text-dark-bg' : 'bg-dark-surface text-gray-400 hover:text-accent'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  property.listingType === 'SALE' 
                    ? 'bg-accent text-dark-bg' 
                    : 'bg-dark-surface text-accent border border-accent'
                }`}>
                  {property.listingType === 'SALE' ? 'For Sale' : 'For Rent'}
                </span>
              </div>
            </div>
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2 line-clamp-2">{property.title}</h3>
                  <div className="flex items-center text-gray-400 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.address}, {property.city}, {property.state}</span>
                  </div>
                  <span className="px-3 py-1 rounded-lg text-sm font-medium bg-dark-surface-light text-gray-300">
                    {getPropertyTypeLabel(property.propertyType)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-accent mb-1">
                    {formatPrice(property.price, property.listingType)}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 mb-4 line-clamp-2">{property.description}</p>
              
              <div className="flex items-center gap-6 text-gray-400 mb-4">
                {property.bedrooms !== undefined && (
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span className="text-sm">{property.bedrooms} beds</span>
                  </div>
                )}
                {property.bathrooms !== undefined && (
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span className="text-sm">{property.bathrooms} baths</span>
                  </div>
                )}
                {property.squareFeet && (
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    <span className="text-sm">{property.squareFeet.toLocaleString()} sqft</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => navigate(`/properties/${property._id}`)}
                className="btn-primary"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="card group cursor-pointer hover:shadow-neon transition-all duration-300" 
           onClick={() => navigate(`/properties/${property._id}`)}>
        <div className="relative">
          <img
            src={property.images[0]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'}
            alt={property.title}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(property._id);
            }}
                          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 ${
                isFavorite ? 'bg-accent text-dark-bg' : 'bg-dark-surface text-gray-400 hover:text-accent'
              }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
              property.listingType === 'SALE' 
                ? 'bg-accent text-dark-bg' 
                : 'bg-dark-surface text-accent border border-accent'
            }`}>
              {property.listingType === 'SALE' ? 'For Sale' : 'For Rent'}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="text-2xl font-bold text-accent mb-2">
            {formatPrice(property.price, property.listingType)}
          </div>
          <h3 className="text-lg font-bold text-gray-100 mb-2 line-clamp-1">{property.title}</h3>
          <div className="flex items-center text-gray-400 mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm line-clamp-1">{property.address}, {property.city}, {property.state}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-lg text-sm font-medium bg-dark-surface-light text-gray-300">
              {getPropertyTypeLabel(property.propertyType)}
            </span>
            <div className="flex items-center gap-4 text-gray-400">
              {property.bedrooms !== undefined && (
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms !== undefined && (
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{property.bathrooms}</span>
                </div>
              )}
              {property.squareFeet && (
                <div className="flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  <span>{property.squareFeet.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
              <div className="min-h-screen pt-20" style={{backgroundColor: '#0A0A0F'}}>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Properties {filters.listingType && `for ${filters.listingType === 'SALE' ? 'Sale' : 'Rent'}`}
            {filters.city && ` in ${filters.city}`}
          </h1>
          <p className="text-gray-400">
            {loading ? 'Searching...' : `${properties.length} properties found`}
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by city, neighborhood, or address"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="input-field pl-12"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-3">
              <select
                value={filters.listingType}
                onChange={(e) => handleFilterChange('listingType', e.target.value)}
                className="input-field w-auto"
              >
                <option value="">All Types</option>
                <option value="SALE">For Sale</option>
                <option value="RENT">For Rent</option>
              </select>

              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="input-field w-auto"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`btn-secondary flex items-center gap-2 ${showFilters ? 'bg-accent/10 border-accent text-accent' : ''}`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>

              <div className="flex items-center gap-2 border-l border-dark-border pl-3">
                <button
                  onClick={() => setViewMode('grid')}
                                      className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-accent text-dark-bg' : 'text-gray-400 hover:text-accent'
                    }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                                      className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-accent text-dark-bg' : 'text-gray-400 hover:text-accent'
                    }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-dark-border animate-slide-down">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Property Type</label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Types</option>
                    <option value="HOUSE">House</option>
                    <option value="APARTMENT">Apartment</option>
                    <option value="CONDO">Condo</option>
                    <option value="TOWNHOUSE">Townhouse</option>
                    <option value="LOFT">Loft</option>
                    <option value="STUDIO">Studio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Min Price</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="number"
                      placeholder="0"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Price</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="number"
                      placeholder="No limit"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bedrooms</label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <button onClick={applyFilters} className="btn-primary">
                  Apply Filters
                </button>
                <button onClick={clearFilters} className="btn-secondary">
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <Search className="h-24 w-24 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">No properties found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search criteria or filters</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-400 text-sm">
              Showing {properties.length} of {total} properties
            </div>
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }>
              {properties.map((property) => (
                <PropertyCard 
                  key={property._id} 
                  property={property} 
                  isListView={viewMode === 'list'} 
                />
              ))}
            </div>
            
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="btn-primary btn-lg px-8"
                >
                  {loadingMore ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Loading...
                    </span>
                  ) : (
                    `Load More (${total - properties.length} remaining)`
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyListPage; 