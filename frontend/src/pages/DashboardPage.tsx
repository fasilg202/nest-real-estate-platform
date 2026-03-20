import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  Home, 
  Plus, 
  Eye,
  Edit, 
  Trash2,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Property {
  _id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  propertyType: string;
  listingType: string;
  bedrooms?: number;
  bathrooms?: number;
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
    try {
      setLoading(true);
      const response = await axios.get('/properties/my-properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    try {
      await axios.delete(`/properties/${id}`);
      setProperties(properties.filter(p => p._id !== id));
    } catch (error) {
      console.error('Failed to delete property:', error);
      alert('Failed to delete property');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const stats = [
    {
      label: 'Total Listings',
      value: properties.length.toString(),
      icon: Home,
      color: 'text-primary-600 bg-primary-100',
    },
    {
      label: 'Active',
      value: properties.filter(p => p.status === 'ACTIVE').length.toString(),
      icon: TrendingUp,
      color: 'text-green-600 bg-green-100',
    },
    {
      label: 'Total Value',
      value: formatPrice(properties.reduce((sum, p) => sum + p.price, 0)),
      icon: DollarSign,
      color: 'text-blue-600 bg-blue-100',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                My Dashboard
              </h1>
              <p className="text-neutral-600">
                Welcome back, {user?.firstName}
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard/add-property')}
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              <Plus className="h-5 w-5" />
              List Property
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Properties List */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
          <div className="p-6 border-b border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-900">My Listings</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-neutral-600">Loading your properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="p-12 text-center">
              <Home className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">No properties yet</h3>
              <p className="text-neutral-600 mb-6">Start by listing your first property</p>
              <button
                onClick={() => navigate('/dashboard/add-property')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                <Plus className="h-5 w-5" />
                List Your First Property
              </button>
            </div>
          ) : (
            <div className="divide-y divide-neutral-200">
              {properties.map((property) => (
                <div key={property._id} className="p-6 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Property Image */}
                    <img
                      src={property.images && property.images.length > 0 
                        ? property.images[0].url 
                        : 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&h=150&fit=crop'}
                      alt={property.title}
                      className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                    />

                    {/* Property Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-neutral-900 mb-1">
                            {property.title}
                          </h3>
                          <p className="text-sm text-neutral-600">
                            {property.address}, {property.city}, {property.state}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          property.status === 'ACTIVE' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-neutral-100 text-neutral-700'
                        }`}>
                          {property.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-neutral-600 mb-4">
                        <span className="font-semibold text-neutral-900 text-lg">
                          {formatPrice(property.price)}
                        </span>
                        {property.bedrooms && <span>{property.bedrooms} bd</span>}
                        {property.bathrooms && <span>{property.bathrooms} ba</span>}
                        <span>{property.propertyType}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => navigate(`/properties/${property._id}`)}
                          className="flex items-center gap-2 px-4 py-2 text-neutral-700 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors text-sm font-medium"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                        <button
                          onClick={() => navigate(`/properties/${property._id}/edit`)}
                          className="flex items-center gap-2 px-4 py-2 text-neutral-700 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors text-sm font-medium"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(property._id)}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
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
    </div>
  );
};

export default DashboardPage;
