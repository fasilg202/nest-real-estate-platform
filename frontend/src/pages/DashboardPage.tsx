import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  Home as HomeIcon, Plus, Edit, Trash2, Eye, MapPin, Bed, Bath, Square,
  TrendingUp, BarChart3, Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  images?: Array<{ url: string }>;
  status: string;
  createdAt: string;
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/properties/my-properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      await axios.delete(`/properties/${id}`);
      setProperties(properties.filter(p => p._id !== id));
    } catch (error) {
      console.error('Failed to delete property:', error);
      alert('Failed to delete property');
    }
  };

  const activeListings = properties.filter(p => p.status === 'ACTIVE').length;
  const totalViews = properties.length * 120; // Mock data

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'SOLD':
        return 'bg-blue-100 text-blue-800';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-dark mb-3">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-dark-muted text-lg">
            Manage your properties and track your listings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-sand rounded-lg flex items-center justify-center">
                <HomeIcon className="h-6 w-6 text-dark" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-3xl font-black text-dark mb-1">{properties.length}</div>
            <div className="text-dark-muted font-medium">Total Listings</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-black text-dark mb-1">{activeListings}</div>
            <div className="text-dark-muted font-medium">Active Listings</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-black text-dark mb-1">{totalViews.toLocaleString()}</div>
            <div className="text-dark-muted font-medium">Total Views</div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-dark">My Properties</h2>
          <button
            onClick={() => navigate('/dashboard/add-property')}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Property</span>
          </button>
        </div>

        {/* Properties List */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-sand border-t-dark mx-auto mb-4"></div>
              <p className="text-dark-muted font-medium">Loading properties...</p>
            </div>
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-card">
            <HomeIcon className="h-24 w-24 mx-auto text-dark-muted opacity-50 mb-4" />
            <h3 className="text-2xl font-bold text-dark mb-3">No properties yet</h3>
            <p className="text-dark-muted mb-6">Start by adding your first property listing</p>
            <button
              onClick={() => navigate('/dashboard/add-property')}
              className="btn-primary mx-auto"
            >
              <Plus className="h-5 w-5 inline mr-2" />
              Add Your First Property
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {properties.map((property) => (
              <div key={property._id} className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-large transition-all">
                <div className="flex flex-col lg:flex-row">
                  {/* Property Image */}
                  <div className="lg:w-80 h-64 lg:h-auto relative">
                    <img
                      src={property.images?.[0]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(property.status)}`}>
                        {property.status}
                      </span>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-dark mb-2 line-clamp-1">{property.title}</h3>
                        <div className="flex items-center text-dark-muted mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{property.address}, {property.city}, {property.state}</span>
                        </div>
                        <span className="inline-block px-3 py-1 bg-sand rounded-lg text-sm font-medium text-dark">
                          {getPropertyTypeLabel(property.propertyType)}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-dark mb-1">
                          {formatPrice(property.price, property.listingType)}
                        </div>
                        <span className="text-sm text-dark-muted">
                          {property.listingType === 'SALE' ? 'For Sale' : 'For Rent'}
                        </span>
                      </div>
                    </div>

                    <p className="text-dark-muted mb-4 line-clamp-2">{property.description}</p>

                    <div className="flex items-center gap-6 text-dark-muted mb-6">
                      {property.bedrooms !== undefined && (
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          <span className="text-sm font-medium">{property.bedrooms} beds</span>
                        </div>
                      )}
                      {property.bathrooms !== undefined && (
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          <span className="text-sm font-medium">{property.bathrooms} baths</span>
                        </div>
                      )}
                      {property.squareFeet && (
                        <div className="flex items-center gap-1">
                          <Square className="h-4 w-4" />
                          <span className="text-sm font-medium">{property.squareFeet.toLocaleString()} sqft</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 ml-auto">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          Listed {new Date(property.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => navigate(`/properties/${property._id}`)}
                        className="flex items-center space-x-2 px-4 py-2 bg-sand text-dark rounded-lg font-semibold hover:bg-taupe hover:text-white transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => navigate(`/dashboard/edit-property/${property._id}`)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
