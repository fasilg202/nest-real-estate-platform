import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  Home, 
  Plus, 
  Heart, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Edit, 
  Trash2,
  Eye,
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  DollarSign
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
  const [activeTab, setActiveTab] = useState('overview');
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

  const stats = {
    totalListings: properties.length,
    totalViews: 0, // Could be calculated from analytics
    inquiries: 0, // Could come from contacts collection
    favorites: 0 // Could come from favorites collection
  };

  const recentActivity = [
    { id: 1, type: 'view', property: 'Modern Downtown Loft', time: '2 hours ago' },
    { id: 2, type: 'inquiry', property: 'Luxury Apartment', time: '5 hours ago' },
    { id: 3, type: 'favorite', property: 'Family Home', time: '1 day ago' },
    { id: 4, type: 'view', property: 'Cozy Studio', time: '2 days ago' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'properties', label: 'My Properties', icon: Home },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const StatCard: React.FC<{ icon: React.ElementType; label: string; value: string | number; change?: string }> = 
    ({ icon: Icon, label, value, change }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className="text-success-600 text-sm mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-accent-100 rounded-xl">
          <Icon className="h-8 w-8 text-accent-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your properties and track your real estate activity
              </p>
            </div>
            <button
              onClick={() => navigate('/properties/new')}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Property</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-accent-600 text-accent-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={Home} 
                label="Total Listings" 
                value={stats.totalListings} 
                change="+2 this month"
              />
              <StatCard 
                icon={Eye} 
                label="Total Views" 
                value={stats.totalViews.toLocaleString()} 
                change="+12% this week"
              />
              <StatCard 
                icon={MessageSquare} 
                label="Inquiries" 
                value={stats.inquiries} 
                change="+5 new"
              />
              <StatCard 
                icon={Heart} 
                label="Favorites" 
                value={stats.favorites} 
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between py-3 border-b border-dark-border last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'view' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'inquiry' ? 'bg-green-100 text-green-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {activity.type === 'view' && <Eye className="h-4 w-4" />}
                        {activity.type === 'inquiry' && <MessageSquare className="h-4 w-4" />}
                        {activity.type === 'favorite' && <Heart className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.property}</p>
                        <p className="text-sm text-gray-600 capitalize">{activity.type}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-12">
                <Home className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Yet</h3>
                <p className="text-gray-600 mb-6">
                  Start building your portfolio by adding your first property listing.
                </p>
                <button
                  onClick={() => navigate('/dashboard/add-property')}
                  className="btn-primary"
                >
                  Add Your First Property
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">My Properties ({properties.length})</h3>
                  <button
                    onClick={() => navigate('/dashboard/add-property')}
                    className="btn-primary flex items-center"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Property
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <div key={property._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 bg-gray-200">
                        {property.images && property.images.length > 0 ? (
                          <img
                            src={property.images[0].url}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Home className="h-16 w-16 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-semibold">
                          {property.status}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2 truncate">{property.title}</h4>
                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.city}, {property.state}
                        </p>
                        <p className="text-lg font-bold text-blue-600 mb-4">
                          ${property.price.toLocaleString()}
                          {property.listingType === 'RENT' && '/mo'}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/properties/${property._id}`)}
                            className="flex-1 btn-secondary text-sm py-2"
                          >
                            <Eye className="h-4 w-4 inline mr-1" />
                            View
                          </button>
                          <button
                            onClick={() => navigate(`/properties/${property._id}/edit`)}
                            className="flex-1 btn-primary text-sm py-2"
                          >
                            <Edit className="h-4 w-4 inline mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(property._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="text-center py-12">
              <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Favorites Yet</h3>
              <p className="text-gray-600 mb-6">
                Properties you favorite will appear here for easy access.
              </p>
              <button
                onClick={() => navigate('/properties')}
                className="btn-primary"
              >
                Browse Properties
              </button>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="text-center py-12">
              <MessageSquare className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Messages</h3>
              <p className="text-gray-600 mb-6">
                Messages from potential buyers and renters will appear here.
              </p>
              <button
                onClick={() => navigate('/properties')}
                className="btn-primary"
              >
                View Properties
              </button>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input 
                    type="text" 
                    className="input" 
                    defaultValue={user?.firstName || ''} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input 
                    type="text" 
                    className="input" 
                    defaultValue={user?.lastName || ''} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="input" 
                    defaultValue={user?.email || ''} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input 
                    type="tel" 
                    className="input" 
                    defaultValue={user?.phone || ''} 
                  />
                </div>
              </div>
              <div className="mt-6">
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  'Email notifications for new inquiries',
                  'SMS alerts for property views',
                  'Weekly activity summary',
                  'Market updates and insights'
                ].map((notification, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{notification}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage; 