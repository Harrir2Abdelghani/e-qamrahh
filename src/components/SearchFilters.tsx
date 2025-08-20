
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterOptions } from "@/types";
import { X, MapPin, DollarSign, Package, Star } from "lucide-react";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: Partial<FilterOptions>) => void;
  onClearFilters: () => void;
}

export function SearchFilters({ onSearch, onFilter, onClearFilters }: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState<Partial<FilterOptions>>({});
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const categories = [
    'Electronics', 'Vehicles', 'Home & Garden', 'Sports & Recreation',
    'Photography', 'Music', 'Tools', 'Fashion', 'Books', 'Gaming'
  ];

  const conditions = ['excellent', 'good', 'fair'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'views', label: 'Most Popular' }
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilter(newFilters);
  };

  const handlePriceRangeChange = () => {
    if (priceRange.min || priceRange.max) {
      const min = priceRange.min ? parseFloat(priceRange.min) : 0;
      const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
      handleFilterChange('priceRange', [min, max]);
    } else {
      const newFilters = { ...localFilters };
      delete newFilters.priceRange;
      setLocalFilters(newFilters);
      onFilter(newFilters);
    }
  };

  const clearAllFilters = () => {
    setLocalFilters({});
    setPriceRange({ min: '', max: '' });
    onClearFilters();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Package className="w-5 h-5 mr-2" />
          Advanced Filters
        </h3>
        <Button variant="ghost" onClick={clearAllFilters} className="text-gray-500 hover:text-gray-700">
          <X className="w-4 h-4 mr-1" />
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Category Filter */}
        <div className="space-y-2">
          <Label className="flex items-center text-sm font-medium text-gray-700">
            <Package className="w-4 h-4 mr-1" />
            Category
          </Label>
          <Select onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div className="space-y-2">
          <Label className="flex items-center text-sm font-medium text-gray-700">
            <MapPin className="w-4 h-4 mr-1" />
            Location
          </Label>
          <Input
            placeholder="Enter location"
            value={localFilters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          />
        </div>

        {/* Condition Filter */}
        <div className="space-y-2">
          <Label className="flex items-center text-sm font-medium text-gray-700">
            <Star className="w-4 h-4 mr-1" />
            Condition
          </Label>
          <Select onValueChange={(value) => handleFilterChange('condition', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any condition</SelectItem>
              {conditions.map((condition) => (
                <SelectItem key={condition} value={condition}>
                  {condition.charAt(0).toUpperCase() + condition.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Sort By</Label>
          <Select onValueChange={(value) => handleFilterChange('sortBy', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <Label className="flex items-center text-sm font-medium text-gray-700">
          <DollarSign className="w-4 h-4 mr-1" />
          Price Range (per day)
        </Label>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
            onBlur={handlePriceRangeChange}
            className="w-32"
          />
          <span className="text-gray-500">to</span>
          <Input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
            onBlur={handlePriceRangeChange}
            className="w-32"
          />
        </div>
      </div>
    </div>
  );
}
