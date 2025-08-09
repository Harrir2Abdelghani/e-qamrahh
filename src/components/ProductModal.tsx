"use client";

import { Product } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, User, Eye, Heart, Share2, MessageCircle } from "lucide-react";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-emerald-500 text-white";
      case "pending": return "bg-amber-500 text-white";
      case "inactive": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-6xl">{product.image}</div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </DialogTitle>
                <Badge className={getStatusColor(product.status)}>
                  {product.status}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald-600">
                ${product.price}
              </div>
              <div className="text-sm text-gray-500">per day</div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Category</span>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Bookings</span>
                <span className="font-semibold">{product.bookings}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{product.owner}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{product.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{product.views} views</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {(product.tags || []).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Availability</h3>
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Available from {product.availability?.startDate ? new Date(product.availability.startDate).toLocaleDateString() : 'Now'}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
              Book Now
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Contact Owner</span>
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}