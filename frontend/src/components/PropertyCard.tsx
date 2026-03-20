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
      <div className="bg-white rounded-2xl overflow-hidden shadow-elegant hover:shadow-elegant-lg transition-all duration-500">
        {/* Property Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
          <img
            src={image}
            alt={address}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`h-5 w-5 transition-all duration-200 ${
                isFavorite ? 'text-red-500 fill-current scale-110' : 'text-neutral-600'
              }`} 
            />
          </button>
        </div>

        {/* Property Details */}
        <div className="p-6">
          {/* Price */}
          <div className="mb-4">
            <p className="font-display text-2xl text-neutral-900 mb-1">
              {formatPrice(price)}
            </p>
            <h3 className="text-neutral-700 font-medium mb-1 group-hover:text-accent-600 transition-colors">
              {address}
            </h3>
            <p className="text-sm text-neutral-500">
              {city}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent mb-4"></div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-neutral-600">
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 text-neutral-400" />
              <span className="font-medium">{beds}</span>
            </div>
            <div className="w-px h-4 bg-primary-200"></div>
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-neutral-400" />
              <span className="font-medium">{baths}</span>
            </div>
            <div className="w-px h-4 bg-primary-200"></div>
            <div className="flex items-center gap-1.5">
              <Square className="h-4 w-4 text-neutral-400" />
              <span className="font-medium">{formatNumber(sqft)}</span>
            </div>
          </div>
        </div>

        {/* Hover action bar */}
        <div className="h-0 group-hover:h-14 overflow-hidden transition-all duration-300 bg-primary-50 border-t border-primary-100">
          <div className="flex items-center justify-center h-14 text-accent-700 font-medium text-sm">
            View Details →
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
