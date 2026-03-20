import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Share2, 
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Home as HomeIcon,
  Calendar
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
  yearBuilt?: number;
  monthlyRent?: number;
  securityDeposit?: number;
  leaseTermMonths?: number;
  images: Array<{ url: string; }>;
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
    // TODO: Wire to backend POST /api/contacts
    alert('Contact form submitted! (Backend integration pending)');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
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
      <div className="min-h-screen bg-neutral-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading property...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-neutral-900 mb-4">{error || 'Property not found'}</p>
          <button
            onClick={() => navigate('/properties')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  const displayImages = property.images && property.images.length > 0 
    ? property.images 
    : [{ url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop' }];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Back Button */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to search
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative bg-neutral-900 h-[500px]">
        <img
          src={displayImages[currentImageIndex].url}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {displayImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-neutral-900" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-neutral-900" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {displayImages.length}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title and Price */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-neutral-900 mb-2">
                    {formatPrice(property.listingType === 'RENT' ? property.monthlyRent || property.price : property.price)}
                    {property.listingType === 'RENT' && <span className="text-2xl text-neutral-600">/mo</span>}
                  </h1>
                  <div className="flex items-center text-neutral-600 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-neutral-600'}`} />
                  </button>
                  <button className="p-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                    <Share2 className="h-5 w-5 text-neutral-600" />
                  </button>
                </div>
              </div>

              {/* Property Stats */}
              <div className="flex items-center gap-6 text-lg text-neutral-700">
                {property.bedrooms && (
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5" />
                    <span>{property.bedrooms} bd</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5" />
                    <span>{property.bathrooms} ba</span>
                  </div>
                )}
                {property.squareFeet && (
                  <div className="flex items-center gap-2">
                    <Square className="h-5 w-5" />
                    <span>{formatNumber(property.squareFeet)} sqft</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <HomeIcon className="h-5 w-5" />
                  <span>{property.propertyType}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-neutral-200 pt-6 mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Overview</h2>
              <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                {property.description || 'No description available.'}
              </p>
            </div>

            {/* Property Details */}
            <div className="border-t border-neutral-200 pt-6 mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.propertyType && (
                  <div>
                    <p className="text-neutral-600 text-sm">Property Type</p>
                    <p className="text-neutral-900 font-medium">{property.propertyType}</p>
                  </div>
                )}
                {property.yearBuilt && (
                  <div>
                    <p className="text-neutral-600 text-sm">Year Built</p>
                    <p className="text-neutral-900 font-medium">{property.yearBuilt}</p>
                  </div>
                )}
                {property.listingType && (
                  <div>
                    <p className="text-neutral-600 text-sm">Listing Type</p>
                    <p className="text-neutral-900 font-medium">{property.listingType === 'SALE' ? 'For Sale' : 'For Rent'}</p>
                  </div>
                )}
                {property.status && (
                  <div>
                    <p className="text-neutral-600 text-sm">Status</p>
                    <p className="text-neutral-900 font-medium">{property.status}</p>
                  </div>
                )}
                {property.listingType === 'RENT' && property.leaseTermMonths && (
                  <div>
                    <p className="text-neutral-600 text-sm">Lease Term</p>
                    <p className="text-neutral-900 font-medium">{property.leaseTermMonths} months</p>
                  </div>
                )}
                {property.listingType === 'RENT' && property.securityDeposit && (
                  <div>
                    <p className="text-neutral-600 text-sm">Security Deposit</p>
                    <p className="text-neutral-900 font-medium">{formatPrice(property.securityDeposit)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Contact Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Contact Agent</h3>
                
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="I'm interested in this property..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Request Information
                  </button>
                </form>

                {/* Agent Info */}
                {property.owner && (
                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <p className="text-sm text-neutral-600 mb-2">Listed by</p>
                    <p className="font-medium text-neutral-900">
                      {property.owner.firstName} {property.owner.lastName}
                    </p>
                    {property.owner.phone && (
                      <p className="text-sm text-neutral-600 mt-1">{property.owner.phone}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
