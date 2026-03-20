import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bed, Bath, Square, Heart } from 'lucide-react';

interface PropertyCardProps {
  id: number;
  price: number;
  address: string;
  city: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: number) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  price,
  address,
  city,
  beds,
  baths,
  sqft,
  image,
  isFavorite = false,
  onFavoriteToggle,
}) => {
  const navigate = useNavigate();

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

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(id);
    }
  };

  return (
    <div
      onClick={() => navigate(`/properties/${id}`)}
      className="group cursor-pointer"
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
        {/* Property Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={address}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2.5 bg-white rounded-full shadow-md hover:bg-dark-50 transition-colors"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`h-5 w-5 transition-colors ${
                isFavorite ? 'text-red-500 fill-current' : 'text-dark-600'
              }`} 
            />
          </button>
        </div>

        {/* Property Details */}
        <div className="p-5">
          <p className="text-2xl font-bold text-dark-900 mb-2">
            {formatPrice(price)}
          </p>
          <p className="text-dark-700 font-medium mb-1">
            {address}
          </p>
          <p className="text-sm text-dark-500 mb-4">
            {city}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-dark-600 pt-4 border-t border-dark-100">
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4" />
              <span>{beds} bed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" />
              <span>{baths} bath</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="h-4 w-4" />
              <span>{formatNumber(sqft)} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
