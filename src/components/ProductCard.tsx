
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Star, Eye, Calendar, Crown } from "lucide-react";

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
