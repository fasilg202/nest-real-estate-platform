import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  Calendar,
  Eye,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  Home,
  Wifi,
  Zap,
  Shield,
  X
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: string;
  listingType: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  lotSize?: number;
  yearBuilt?: number;
  parkingSpots?: number;
  monthlyRent?: number;
  securityDeposit?: number;
  leaseTermMonths?: number;
  petsAllowed?: boolean;
  utilitiesIncluded?: boolean;
  images: Array<{ url: string; caption?: string }>;
  features: string[];
  amenities: string[];
  status: string;
  owner: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  createdAt: string;
}

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: user?.firstName + ' ' + user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    message: ''
  });

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/properties/${id}`);
      setProperty(response.data);
    } catch (error) {
      console.error('Failed to fetch property:', error);
      setError('Property not found');
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted:', contactForm);
    setShowContactForm(false);
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

  const nextImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <Home className="h-24 w-24 mx-auto" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Property Not Found</h3>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/properties')} 
            className="btn-primary"
          >
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  const defaultImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop';
  const images = property.images.length > 0 ? property.images : [{ url: defaultImage }];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to listings</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden bg-gray-200">
                <img
                  src={images[currentImageIndex]?.url}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all"
                    >
                      <ChevronLeft className="h-6 w-6 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all"
                    >
                      <ChevronRight className="h-6 w-6 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-full transition-all ${
                      isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 bg-white/80 hover:bg-white text-gray-700 rounded-full transition-all">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-accent-600' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="badge-primary">
                      {property.listingType === 'SALE' ? 'For Sale' : 'For Rent'}
                    </span>
                    <span className="badge-secondary">
                      {getPropertyTypeLabel(property.propertyType)}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-accent-600 mb-1">
                    {formatPrice(property.price, property.listingType)}
                  </div>
                  {property.listingType === 'RENT' && property.securityDeposit && (
                    <div className="text-sm text-gray-600">
                      Security Deposit: ${property.securityDeposit.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-200">
                {property.bedrooms !== undefined && (
                  <div className="text-center">
                    <Bed className="h-8 w-8 text-accent-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                )}
                {property.bathrooms !== undefined && (
                  <div className="text-center">
                    <Bath className="h-8 w-8 text-accent-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                )}
                {property.squareFeet && (
                  <div className="text-center">
                    <Square className="h-8 w-8 text-accent-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.squareFeet.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                )}
                {property.parkingSpots !== undefined && property.parkingSpots > 0 && (
                  <div className="text-center">
                    <Car className="h-8 w-8 text-accent-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.parkingSpots}</div>
                    <div className="text-sm text-gray-600">Parking</div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Additional Details */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Property Details</h4>
                  <div className="space-y-2 text-sm">
                    {property.yearBuilt && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Year Built:</span>
                        <span className="font-medium">{property.yearBuilt}</span>
                      </div>
                    )}
                    {property.lotSize && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lot Size:</span>
                        <span className="font-medium">{property.lotSize.toLocaleString()} sq ft</span>
                      </div>
                    )}
                    {property.listingType === 'RENT' && (
                      <>
                        {property.leaseTermMonths && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Lease Term:</span>
                            <span className="font-medium">{property.leaseTermMonths} months</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pets Allowed:</span>
                          <span className="font-medium">{property.petsAllowed ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Utilities Included:</span>
                          <span className="font-medium">{property.utilitiesIncluded ? 'Yes' : 'No'}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Listing Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Listed:</span>
                      <span className="font-medium">
                        {new Date(property.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium">{property.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property ID:</span>
                      <span className="font-medium">#{property._id.slice(-6).toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features & Amenities */}
            {(property.features.length > 0 || property.amenities.length > 0) && (
              <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Features & Amenities</h3>
                
                {property.features.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Property Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-success-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {property.amenities.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Amenities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-success-600 flex-shrink-0" />
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{
                background: 'linear-gradient(to right, #C5FF4B, #A8E640)'
              }}>
                  <span className="text-white text-xl font-bold">
                    {property.owner.firstName.charAt(0)}{property.owner.lastName.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">
                  {property.owner.firstName} {property.owner.lastName}
                </h3>
                <p className="text-gray-600">Property Owner</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Mail className="h-5 w-5" />
                  <span>Contact Owner</span>
                </button>
                
                {property.owner.phone && (
                  <a
                    href={`tel:${property.owner.phone}`}
                    className="w-full btn-outline flex items-center justify-center space-x-2"
                  >
                    <Phone className="h-5 w-5" />
                    <span>Call Now</span>
                  </a>
                )}

                <button className="w-full btn-ghost flex items-center justify-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Schedule Tour</span>
                </button>
              </div>

              {/* Property Overview */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Overview</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold text-accent-600">
                      {formatPrice(property.price, property.listingType)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{getPropertyTypeLabel(property.propertyType)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">
                      {property.squareFeet ? `${property.squareFeet.toLocaleString()} sq ft` : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety & Trust */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6 text-success-600" />
                <h3 className="font-semibold text-gray-900">Safety & Trust</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success-600" />
                  <span className="text-gray-700">Verified property owner</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success-600" />
                  <span className="text-gray-700">Secure messaging</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success-600" />
                  <span className="text-gray-700">Protected personal info</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Contact Owner</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  className="input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  className="input h-24 resize-none"
                  placeholder="I'm interested in this property..."
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailPage; 