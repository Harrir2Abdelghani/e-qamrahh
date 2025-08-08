"use client";

import { useState } from "react";
import { Product } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Eye, Calendar, Heart, Share2 } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export function ProductCard({ product, onView, onEdit, onDelete, showActions = false }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleView = () => {
    onView(product);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-emerald-500 text-white";
      case "pending": return "bg-amber-500 text-white";
      case "inactive": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden">
      <CardHeader className="pb-3 relative">
        <div className="flex items-start justify-between">
          <div className="text-4xl mb-2">{product.image}</div>
          <div className="flex flex-col gap-2">
            <Badge className={getStatusColor(product.status)}>
              {product.status}
            </Badge>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Share2 className="w-4 h-4 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
        
        <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
          {product.name}
        </CardTitle>
        
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Category</span>
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="font-semibold text-gray-900">{product.rating}</span>
            <span className="text-gray-500 text-sm">({product.bookings} bookings)</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-600">
              ${product.price}
            </div>
            <div className="text-xs text-gray-500">per day</div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{product.location}</span>
        </div>

        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{product.views} views</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>Available now</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {product.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            onClick={handleView}
            className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
          >
            View Details
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