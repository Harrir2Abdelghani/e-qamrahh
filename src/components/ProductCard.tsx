"use client";

import { useState } from "react";
import { Product } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Eye, Calendar, Heart, Share2, Clock, Shield, Truck, User } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  onFavoriteToggle?: (id: string) => void;
  isFavorite?: boolean;
  showActions?: boolean;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ 
  product, 
  onView, 
  onEdit, 
  onDelete, 
  onFavoriteToggle,
  isFavorite = false,
  showActions = false,
  viewMode = 'grid'
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleView = () => {
    onView(product);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.(product.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-emerald-500 text-white";
      case "pending": return "bg-amber-500 text-white";
      case "inactive": return "bg-red-500 text-white";
      case "rented": return "bg-blue-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent": return "text-emerald-600 bg-emerald-50";
      case "good": return "text-blue-600 bg-blue-50";
      case "fair": return "text-amber-600 bg-amber-50";
      case "poor": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  if (viewMode === 'list') {
    return (
      <Card className="group hover:shadow-xl transition-all duration-300 bg-white border border-gray-200 hover:border-indigo-300">
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-4xl">
                {product.image}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                    <Badge variant="outline" className={getConditionColor(product.condition)}>
                      {product.condition}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">
                    ${product.price}
                  </div>
                  <div className="text-xs text-gray-500">per day</div>
                </div>
              </div>

              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{product.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{product.views}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleFavorite}
                    className="h-8 w-8 p-0"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="h-8 w-8 p-0"
                  >
                    <Share2 className="w-4 h-4 text-gray-400" />
                  </Button>
                  <Button onClick={handleView} size="sm">
                    View Details
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
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden">
      <CardHeader className="pb-3 relative">
        <div className="flex items-start justify-between mb-3">
          <div className="text-4xl">{product.image}</div>
          <div className="flex flex-col gap-2">
            <Badge className={getStatusColor(product.status)}>
              {product.status}
            </Badge>
            {product.featured && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                Featured
              </Badge>
            )}
          </div>
        </div>
        
        <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2 mb-2">
          {product.name}
        </CardTitle>
        
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-3">
          {product.description}
        </p>

        {/* Quick Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <div className="flex items-center space-x-1">
            <User className="w-3 h-3" />
            <span>{product.owner}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{product.minRentalDays}-{product.maxRentalDays} days</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
            <Badge variant="outline" className={`text-xs ${getConditionColor(product.condition)}`}>
              {product.condition}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-600">
              ${product.price}
            </div>
            <div className="text-xs text-gray-500">per day</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="font-semibold text-gray-900">{product.rating}</span>
            <span className="text-gray-500 text-sm">({product.bookings} bookings)</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{product.location}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            {product.deliveryOptions?.delivery && (
              <div className="flex items-center space-x-1">
                <Truck className="w-3 h-3" />
                <span>Delivery</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>Insured</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{product.views} views</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {(product.tags || []).slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
              {tag}
            </Badge>
          ))}
          {(product.tags || []).length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              +{(product.tags || []).length - 3} more
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={handleView}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            View Details
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleFavorite}
            className="px-3"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="px-3"
          >
            <Share2 className="w-4 h-4" />
          </Button>

          {showActions && onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(product)}
              className="px-3"
            >
              Edit
            </Button>
          )}
          
          {showActions && onDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(product.id)}
              className="px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}