"use client";

import { useState } from "react";
import { FilterOptions } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, X, MapPin, DollarSign, Star } from "lucide-react";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: Partial<FilterOptions>) => void;
  onClearFilters: () => void;
}

export function SearchFilters({ onSearch, onFilter, onClearFilters }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Partial<FilterOptions>>({});

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({});
    setSearchQuery("");
    onSearch("");
    onClearFilters();
  };

  const categories = [
    "Dresses",
    "Jewelries", 
    "Others"
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search products, categories, or locations..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-gray-900 rounded-xl"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </Button>
        
        {Object.keys(filters).length > 0 && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
            <span>Clear All</span>
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="border-2 border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filter Products</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <span>Category</span>
                </Label>
                <Select
                  value={filters.category || ""}
                  onValueChange={(value) => handleFilterChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
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
                <Label className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Location</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Enter city or state"
                  value={filters.location || ""}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                />
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Max Price/Day</span>
                </Label>
                <Input
                  type="number"
                  placeholder="Max price"
                  value={filters.priceRange?.[1] || ""}
                  onChange={(e) => handleFilterChange("priceRange", [0, parseInt(e.target.value) || 1000])}
                />
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span>Min Rating</span>
                </Label>
                <Select
                  value={filters.rating?.toString() || ""}
                  onValueChange={(value) => handleFilterChange("rating", parseFloat(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Rating</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="4.0">4.0+ Stars</SelectItem>
                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                    <SelectItem value="3.0">3.0+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
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
