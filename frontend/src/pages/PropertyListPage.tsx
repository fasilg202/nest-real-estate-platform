import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Grid, List, 
  SlidersHorizontal, DollarSign, X
} from 'lucide-react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';

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

  const toggleFavorite = (propertyId: number) => {
    const id = propertyId.toString();
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fid => fid !== id)
        : [...prev, id]
    );
  };

  const getActiveFiltersCount = () => {
    return Object.entries(filters).filter(([key, value]) => 
      value && key !== 'sortBy' && key !== 'city' && key !== 'listingType'
    ).length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-dark mb-3">
            {filters.listingType === 'RENT' ? 'Homes for Rent' : filters.listingType === 'SALE' ? 'Homes for Sale' : 'All Properties'}
            {filters.city && ` in ${filters.city}`}
          </h1>
          <p className="text-dark-muted text-lg">
            {loading ? 'Searching...' : `${total.toLocaleString()} ${total === 1 ? 'property' : 'properties'} available`}
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-xl shadow-medium p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-muted h-5 w-5" />
              <input
                type="text"
                placeholder="Search by city or neighborhood..."
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-taupe transition-colors"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap">
              <select
                value={filters.listingType}
                onChange={(e) => {
                  handleFilterChange('listingType', e.target.value);
                  const params = new URLSearchParams(searchParams);
                  if (e.target.value) {
                    params.set('listingType', e.target.value);
                  } else {
                    params.delete('listingType');
                  }
                  setSearchParams(params);
                }}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-taupe bg-white font-medium"
              >
                <option value="">All Listings</option>
                <option value="SALE">For Sale</option>
                <option value="RENT">For Rent</option>
              </select>

              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-taupe bg-white font-medium"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`relative px-4 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 ${
                  showFilters || activeFiltersCount > 0
                    ? 'bg-dark text-white' 
                    : 'bg-sand text-dark hover:bg-taupe hover:text-white'
                }`}
              >
                <SlidersHorizontal className="h-5 w-5" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-taupe text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2 border-l border-gray-300 pl-3">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-dark text-white' : 'text-dark-muted hover:bg-sand'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-dark text-white' : 'text-dark-muted hover:bg-sand'
                  }`}
                  aria-label="List view"
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">Property Type</label>
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
                  <label className="block text-sm font-semibold text-dark mb-2">Min Price</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-muted h-4 w-4" />
                    <input
                      type="number"
                      placeholder="No minimum"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">Max Price</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-muted h-4 w-4" />
                    <input
                      type="number"
                      placeholder="No maximum"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark mb-2">Bedrooms</label>
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
                <button onClick={clearFilters} className="btn-outline">
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Active Filter Chips */}
        {(filters.city || filters.listingType || activeFiltersCount > 0) && !showFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.city && (
              <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-soft">
                <MapPin className="h-4 w-4 text-dark-muted" />
                <span className="text-sm font-medium">{filters.city}</span>
                <button
                  onClick={() => {
                    handleFilterChange('city', '');
                    const params = new URLSearchParams(searchParams);
                    params.delete('city');
                    setSearchParams(params);
                  }}
                  className="text-dark-muted hover:text-dark"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            {/* Add more filter chips as needed */}
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-sand border-t-dark mx-auto mb-4"></div>
              <p className="text-dark-muted font-medium">Loading properties...</p>
            </div>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-32">
            <div className="mb-6">
              <Search className="h-24 w-24 mx-auto text-dark-muted opacity-50" />
            </div>
            <h3 className="text-2xl font-bold text-dark mb-3">No properties found</h3>
            <p className="text-dark-muted mb-6">Try adjusting your search criteria or filters</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-6'
            }>
              {properties.map((property) => {
                const propertyData = {
                  id: parseInt(property._id),
                  image: property.images[0]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
                  price: property.price,
                  location: `${property.city}, ${property.state}`,
                  beds: property.bedrooms || 0,
                  baths: property.bathrooms || 0,
                  sqft: property.squareFeet || 0,
                  favorite: favorites.includes(property._id),
                };

                return (
                  <PropertyCard
                    key={property._id}
                    {...propertyData}
                    onFavoriteToggle={toggleFavorite}
                  />
                );
              })}
            </div>
            
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="btn-outline btn-lg"
                >
                  {loadingMore ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-dark border-t-transparent mr-2"></div>
                      Loading...
                    </span>
                  ) : (
                    `Load More (${(total - properties.length).toLocaleString()} remaining)`
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
