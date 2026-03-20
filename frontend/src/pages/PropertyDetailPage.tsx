import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Bed, Bath, Square, Car, Heart, Share2, Phone, Mail, 
  Calendar, Eye, ArrowLeft, ChevronLeft, ChevronRight, Check, Home, User
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
  zipCode?: string;
  propertyType: string;
  listingType: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  lotSize?: number;
  yearBuilt?: number;
  parkingSpots?: number;
  images: Array<{ url: string; caption?: string }>;
  features: string[];
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
    name: user ? `${user.firstName} ${user.lastName}` : '',
    email: user?.email || '',
    phone: '',
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
    
    try {
      await axios.post('/contacts', {
        propertyId: property?._id,
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        message: contactForm.message
      });
      
      alert('Message sent successfully! The property owner will contact you soon.');
      setShowContactForm(false);
      setContactForm({
        name: user ? `${user.firstName} ${user.lastName}` : '',
        email: user?.email || '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    }
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
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-sand border-t-dark mx-auto mb-4"></div>
          <p className="text-dark-muted font-medium">Loading property...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center pt-20">
        <div className="text-center">
          <Home className="h-24 w-24 mx-auto text-dark-muted opacity-50 mb-4" />
          <h2 className="text-2xl font-bold text-dark mb-3">Property Not Found</h2>
          <p className="text-dark-muted mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/properties')} className="btn-primary">
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-20 pb-16">
      {/* Back Button */}
      <div className="container py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-dark-muted hover:text-dark transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to listings</span>
        </button>
      </div>

      {/* Image Gallery */}
      <div className="container mb-8">
        <div className="relative rounded-2xl overflow-hidden shadow-large bg-white">
          {property.images && property.images.length > 0 ? (
            <>
              <img
                src={property.images[currentImageIndex]?.url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop'}
                alt={property.title}
                className="w-full h-96 md:h-[500px] lg:h-[600px] object-cover"
              />
              
              {/* Image Navigation */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-medium hover:shadow-large transition-all"
                  >
                    <ChevronLeft className="h-6 w-6 text-dark" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-medium hover:shadow-large transition-all"
                  >
                    <ChevronRight className="h-6 w-6 text-dark" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-dark text-white px-4 py-2 rounded-lg font-semibold">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </>
              )}

              {/* Favorite & Share Buttons */}
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-medium hover:shadow-large transition-all"
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-dark-muted'}`} />
                </button>
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-medium hover:shadow-large transition-all">
                  <Share2 className="h-6 w-6 text-dark-muted" />
                </button>
              </div>
            </>
          ) : (
            <div className="w-full h-96 md:h-[500px] bg-sand flex items-center justify-center">
              <Home className="h-24 w-24 text-dark-muted opacity-50" />
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {property.images && property.images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {property.images.slice(0, 6).map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentImageIndex ? 'border-dark' : 'border-transparent'
                }`}
              >
                <img src={image.url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl p-8 shadow-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-sand rounded-lg text-sm font-semibold text-dark mb-3">
                    {getPropertyTypeLabel(property.propertyType)}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-black text-dark mb-3">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-dark-muted">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">
                      {property.address}, {property.city}, {property.state} {property.zipCode}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-dark mb-1">
                    {formatPrice(property.price, property.listingType)}
                  </div>
                  <span className="text-dark-muted">
                    {property.listingType === 'SALE' ? 'For Sale' : 'For Rent'}
                  </span>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
                {property.bedrooms !== undefined && (
                  <div className="text-center p-4 bg-cream rounded-lg">
                    <Bed className="h-6 w-6 mx-auto text-dark mb-2" />
                    <div className="font-bold text-dark">{property.bedrooms}</div>
                    <div className="text-sm text-dark-muted">Bedrooms</div>
                  </div>
                )}
                {property.bathrooms !== undefined && (
                  <div className="text-center p-4 bg-cream rounded-lg">
                    <Bath className="h-6 w-6 mx-auto text-dark mb-2" />
                    <div className="font-bold text-dark">{property.bathrooms}</div>
                    <div className="text-sm text-dark-muted">Bathrooms</div>
                  </div>
                )}
                {property.squareFeet && (
                  <div className="text-center p-4 bg-cream rounded-lg">
                    <Square className="h-6 w-6 mx-auto text-dark mb-2" />
                    <div className="font-bold text-dark">{property.squareFeet.toLocaleString()}</div>
                    <div className="text-sm text-dark-muted">Sq. Feet</div>
                  </div>
                )}
                {property.parkingSpots !== undefined && (
                  <div className="text-center p-4 bg-cream rounded-lg">
                    <Car className="h-6 w-6 mx-auto text-dark mb-2" />
                    <div className="font-bold text-dark">{property.parkingSpots}</div>
                    <div className="text-sm text-dark-muted">Parking</div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-8 shadow-card">
              <h2 className="text-2xl font-bold text-dark mb-4">Description</h2>
              <p className="text-dark-muted leading-relaxed whitespace-pre-wrap">{property.description}</p>
            </div>

            {/* Features & Amenities */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-xl p-8 shadow-card">
                <h2 className="text-2xl font-bold text-dark mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-dark-muted">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Property Details */}
            <div className="bg-white rounded-xl p-8 shadow-card">
              <h2 className="text-2xl font-bold text-dark mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-dark-muted text-sm mb-1">Type</div>
                  <div className="font-semibold text-dark">{getPropertyTypeLabel(property.propertyType)}</div>
                </div>
                <div>
                  <div className="text-dark-muted text-sm mb-1">Status</div>
                  <div className="font-semibold text-dark">{property.status}</div>
                </div>
                {property.yearBuilt && (
                  <div>
                    <div className="text-dark-muted text-sm mb-1">Year Built</div>
                    <div className="font-semibold text-dark">{property.yearBuilt}</div>
                  </div>
                )}
                {property.lotSize && (
                  <div>
                    <div className="text-dark-muted text-sm mb-1">Lot Size</div>
                    <div className="font-semibold text-dark">{property.lotSize.toLocaleString()} sq ft</div>
                  </div>
                )}
                <div>
                  <div className="text-dark-muted text-sm mb-1">Listed</div>
                  <div className="font-semibold text-dark">{new Date(property.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="bg-white rounded-xl p-6 shadow-card sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Contact Agent</h3>
              
              {/* Agent Info */}
              <div className="flex items-center space-x-3 mb-6 p-4 bg-cream rounded-lg">
                <div className="w-12 h-12 bg-taupe rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-dark">
                    {property.owner.firstName} {property.owner.lastName}
                  </div>
                  <div className="text-sm text-dark-muted">Property Owner</div>
                </div>
              </div>

              {!showContactForm ? (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Send Message</span>
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
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      className="input-field resize-none"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button type="submit" className="flex-1 btn-primary">
                      Send
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="flex-1 btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
