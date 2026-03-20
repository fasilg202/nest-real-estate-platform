import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';

interface PropertyCardProps {
  id: number;
  image: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  favorite?: boolean;
  onFavoriteToggle?: (id: number) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  image,
  price,
  location,
  beds,
  baths,
  sqft,
  favorite = false,
  onFavoriteToggle,
}) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(id);
    }
  };

  return (
    <div
      className="property-card cursor-pointer"
      onClick={() => navigate(`/property/${id}`)}
    >
      {/* Property Image */}
      <div className="relative overflow-hidden h-64">
        <img
          src={image}
          alt={location}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-soft hover:shadow-medium transition-all"
          aria-label="Toggle favorite"
        >
          <Heart className={`h-5 w-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-dark-muted'}`} />
        </button>

        {/* Location Badge */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white rounded-lg px-3 py-2 shadow-soft">
          <MapPin className="h-4 w-4 text-dark-muted" />
          <span className="text-sm font-medium text-dark">{location}</span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-dark">
            {formatPrice(price)}
          </h3>
        </div>

        {/* Property Stats */}
        <div className="flex items-center space-x-4 text-dark-muted">
          <div className="flex items-center space-x-1">
            <Bed className="h-4 w-4" />
            <span className="text-sm font-medium">{beds}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="h-4 w-4" />
            <span className="text-sm font-medium">{baths}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Square className="h-4 w-4" />
            <span className="text-sm font-medium">{formatNumber(sqft)} sqft</span>
          </div>
        </div>

        {/* CTA Button */}
        <button 
          className="w-full mt-6 btn-primary"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/property/${id}`);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
