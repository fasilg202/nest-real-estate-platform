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
      <div className="bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
        {/* Property Image */}
        <div className="relative">
          <img
            src={image}
            alt={address}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-neutral-50 transition-colors"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`h-5 w-5 transition-colors ${
                isFavorite ? 'text-red-500 fill-current' : 'text-neutral-600'
              }`} 
            />
          </button>
        </div>

        {/* Property Details */}
        <div className="p-4">
          <p className="text-2xl font-bold text-neutral-900 mb-1">
            {formatPrice(price)}
          </p>
          <div className="flex items-center gap-3 text-sm text-neutral-600 mb-2">
            <span className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              {beds} bd
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              {baths} ba
            </span>
            <span className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              {formatNumber(sqft)} sqft
            </span>
          </div>
          <p className="text-sm text-neutral-600">
            {address}
          </p>
          <p className="text-sm text-neutral-500">
            {city}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
