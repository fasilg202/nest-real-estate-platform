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
  tag?: string;
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
  tag,
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
      <div className="bg-white rounded-2xl overflow-hidden border border-dark-100 hover:shadow-lg transition-all duration-300">
        {/* Property Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={address}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Tag */}
          {tag && (
            <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-medium ${
              tag === 'Featured' 
                ? 'bg-primary-600 text-white' 
                : 'bg-yellow-400 text-dark-900'
            }`}>
              {tag}
            </div>
          )}

          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
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
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-dark-900 mb-1">
                {address}
              </h3>
              <p className="text-sm text-dark-500">
                {city}
              </p>
            </div>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-primary-600 mb-4">
            {formatPrice(price)}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-dark-600 pt-4 border-t border-dark-100">
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4" />
              <span>{beds} Bed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" />
              <span>{baths} Bath</span>
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
