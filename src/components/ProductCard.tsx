
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Star, Eye, Calendar, Crown, ShoppingCart, Share2 } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onProductClick: () => void;
  onAddToCart: () => void;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ 
  product, 
  isFavorite, 
  onFavoriteToggle, 
  onProductClick, 
  onAddToCart,
  viewMode = 'grid'
}: ProductCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (viewMode === 'list') {
    return (
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="flex">
            <div className="relative w-48 h-32 flex-shrink-0">
              <img
                src={product.image || '/placeholder-product.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
                onLoad={() => setIsImageLoading(false)}
              />
              {isImageLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="bg-white/90 text-gray-700">
                  {product.category}
                </Badge>
              </div>
            </div>
            
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600 cursor-pointer transition-colors" onClick={onProductClick}>
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{product.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{product.views} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {formatPrice(product.price)}
                    <span className="text-sm font-normal text-gray-500">/day</span>
                  </div>
                  <Badge variant={product.condition === 'excellent' ? 'default' : 'secondary'}>
                    {product.condition}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onFavoriteToggle}
                    className={`${isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={onProductClick}>
                    View Details
                  </Button>
                  <Button size="sm" onClick={onAddToCart} className="bg-indigo-600 hover:bg-indigo-700">
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Rent Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white group overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={product.image || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onLoad={() => setIsImageLoading(false)}
          />
          {isImageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-white/90 text-gray-700">
              {product.category}
            </Badge>
          </div>
          
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onFavoriteToggle}
              className={`bg-white/90 hover:bg-white ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
          
          {product.featured && (
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-indigo-600 cursor-pointer transition-colors line-clamp-1" onClick={onProductClick}>
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{product.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span>{product.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {formatPrice(product.price)}
                <span className="text-sm font-normal text-gray-500">/day</span>
              </div>
              <Badge variant={product.condition === 'excellent' ? 'default' : 'secondary'} className="mt-1">
                {product.condition}
              </Badge>
            </div>
            <div className="text-right text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{product.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(product.created_at)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onProductClick} className="flex-1">
              View Details
            </Button>
            <Button size="sm" onClick={onAddToCart} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
              <ShoppingCart className="w-4 h-4 mr-1" />
              Rent
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ProductCardProps {
  product: any;
  isFavorited?: boolean;
  onFavoriteToggle?: () => void;
  onClick?: () => void;
}

export default function ProductCard({ 
  product, 
  isFavorited = false, 
  onFavoriteToggle, 
  onClick 
}: ProductCardProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
      <div className="relative" onClick={onClick}>
        {/* Image */}
        <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-6xl">
            {product.images?.[0] || product.image || '📦'}
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.featured && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            {product.condition === 'excellent' && (
              <Badge className="bg-emerald-500 text-white">
                Excellent
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <div className="absolute top-3 right-3">
            <Button
              size="sm"
              variant="secondary"
              className="w-10 h-10 rounded-full p-0 bg-white/90 hover:bg-white shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle?.();
              }}
            >
              <Heart 
                className={`w-4 h-4 ${
                  isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`} 
              />
            </Button>
          </div>

          {/* Stats */}
          <div className="absolute bottom-3 left-3 flex space-x-3">
            <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1 text-xs">
              <Eye className="w-3 h-3 text-gray-500" />
              <span>{product.views || 0}</span>
            </div>
            <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1 text-xs">
              <Calendar className="w-3 h-3 text-gray-500" />
              <span>{product.bookings || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-5" onClick={onClick}>
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating || 5.0}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Location & Owner */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-gray-500 text-xs">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{product.location}</span>
          </div>
          <div className="text-xs text-gray-500">
            by {product.owner?.full_name || product.owner}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="text-gray-500 text-sm">/day</span>
            {product.deposit > 0 && (
              <div className="text-xs text-gray-500">
                +${product.deposit} deposit
              </div>
            )}
          </div>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            View Details
          </Button>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.tags.slice(0, 3).map((tag: string, index: number) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="text-gray-400 text-xs px-2 py-1">
                +{product.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
