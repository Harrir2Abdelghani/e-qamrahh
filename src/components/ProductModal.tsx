"use client";

import { useState } from "react";
import { Product } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Star, 
  MapPin, 
  Calendar, 
  User, 
  Eye, 
  Heart, 
  Share2, 
  MessageCircle,
  Shield,
  Truck,
  Clock,
  DollarSign,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onFavoriteToggle?: (id: string) => void;
  isFavorite?: boolean;
  isAuthenticated?: boolean;
  onAuthRequired?: () => void;
}

export function ProductModal({ 
  product, 
  isOpen, 
  onClose, 
  onFavoriteToggle,
  isFavorite = false,
  isAuthenticated = false,
  onAuthRequired
}: ProductModalProps) {
  const [selectedDates, setSelectedDates] = useState({
    startDate: "",
    endDate: ""
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    message: "",
    deliveryMethod: "pickup" as "pickup" | "delivery",
    deliveryAddress: ""
  });

  if (!product) return null;

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
      case "excellent": return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "good": return "text-blue-600 bg-blue-50 border-blue-200";
      case "fair": return "text-amber-600 bg-amber-50 border-amber-200";
      case "poor": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const calculateTotal = () => {
    if (!selectedDates.startDate || !selectedDates.endDate) return 0;
    const start = new Date(selectedDates.startDate);
    const end = new Date(selectedDates.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const subtotal = days * product.price;
    const deliveryFee = bookingData.deliveryMethod === 'delivery' ? product.deliveryOptions.deliveryFee : 0;
    return subtotal + deliveryFee + product.deposit;
  };

  const handleBooking = () => {
    if (!isAuthenticated) {
      onAuthRequired?.();
      return;
    }
    setShowBookingForm(true);
  };

  const handleFavorite = () => {
    if (!isAuthenticated) {
      onAuthRequired?.();
      return;
    }
    onFavoriteToggle?.(product.id);
  };

  const handleShare = () => {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-6xl">{product.image}</div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </DialogTitle>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(product.status)}>
                    {product.status}
                  </Badge>
                  <Badge variant="outline" className={getConditionColor(product.condition)}>
                    {product.condition} condition
                  </Badge>
                  {product.featured && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-indigo-600">
                ${product.price}
              </div>
              <div className="text-sm text-gray-500">per day</div>
              <div className="text-xs text-gray-400 mt-1">
                ${product.deposit} deposit required
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Specifications */}
            {Object.keys(product.specifications || {}).length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specifications || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Policies */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Rental Policies</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Cancellation Policy</p>
                    <p className="text-blue-700 text-sm">{product.policies?.cancellation}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-900">Damage Policy</p>
                    <p className="text-amber-700 text-sm">{product.policies?.damage}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <Clock className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-900">Late Return Fee</p>
                    <p className="text-red-700 text-sm">${product.policies?.lateFee} per day</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {(product.tags || []).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Info */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Owner</h3>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{product.owner}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="text-sm text-gray-600">4.8 rating</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{product.views}</div>
                <div className="text-xs text-gray-600">Views</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{product.bookings}</div>
                <div className="text-xs text-gray-600">Bookings</div>
              </div>
            </div>

            {/* Location & Delivery */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{product.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {product.minRentalDays}-{product.maxRentalDays} day rental
                </span>
              </div>
              {product.deliveryOptions.delivery && (
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    Delivery available (${product.deliveryOptions.deliveryFee})
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Insured & Protected</span>
              </div>
            </div>

            {/* Booking Form */}
            {!showBookingForm ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="start-date" className="text-sm font-medium">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={selectedDates.startDate}
                      onChange={(e) => setSelectedDates(prev => ({ ...prev, startDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date" className="text-sm font-medium">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={selectedDates.endDate}
                      onChange={(e) => setSelectedDates(prev => ({ ...prev, endDate: e.target.value }))}
                      min={selectedDates.startDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {selectedDates.startDate && selectedDates.endDate && (
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Rental Cost:</span>
                      <span>${(calculateTotal() - product.deposit - (bookingData.deliveryMethod === 'delivery' ? product.deliveryOptions.deliveryFee : 0)).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Deposit:</span>
                      <span>${product.deposit}</span>
                    </div>
                    {bookingData.deliveryMethod === 'delivery' && (
                      <div className="flex justify-between text-sm">
                        <span>Delivery Fee:</span>
                        <span>${product.deliveryOptions.deliveryFee}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold text-indigo-900 border-t border-indigo-200 pt-2 mt-2">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    onClick={handleBooking}
                    disabled={!selectedDates.startDate || !selectedDates.endDate}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleFavorite}
                    className="px-3"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="px-3"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Complete Your Booking</h3>
                
                <div>
                  <Label htmlFor="delivery-method" className="text-sm font-medium">Delivery Method</Label>
                  <select
                    id="delivery-method"
                    value={bookingData.deliveryMethod}
                    onChange={(e) => setBookingData(prev => ({ ...prev, deliveryMethod: e.target.value as any }))}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  >
                    <option value="pickup">Pickup</option>
                    {product.deliveryOptions.delivery && (
                      <option value="delivery">Delivery (+${product.deliveryOptions.deliveryFee})</option>
                    )}
                  </select>
                </div>

                {bookingData.deliveryMethod === 'delivery' && (
                  <div>
                    <Label htmlFor="delivery-address" className="text-sm font-medium">Delivery Address</Label>
                    <Textarea
                      id="delivery-address"
                      value={bookingData.deliveryAddress}
                      onChange={(e) => setBookingData(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                      placeholder="Enter your delivery address..."
                      rows={3}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="message" className="text-sm font-medium">Message to Owner (Optional)</Label>
                  <Textarea
                    id="message"
                    value={bookingData.message}
                    onChange={(e) => setBookingData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Any special requests or questions..."
                    rows={3}
                  />
                </div>

                <div className="p-3 bg-indigo-50 rounded-lg">
                  <div className="text-sm font-semibold text-indigo-900 mb-2">Booking Summary</div>
                  <div className="space-y-1 text-sm text-indigo-800">
                    <div className="flex justify-between">
                      <span>Dates:</span>
                      <span>{selectedDates.startDate} to {selectedDates.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Method:</span>
                      <span className="capitalize">{bookingData.deliveryMethod}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t border-indigo-200 pt-1 mt-2">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                    Confirm Booking
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}