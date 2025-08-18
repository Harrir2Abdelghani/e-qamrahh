
"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { SearchFilters } from "@/components/SearchFilters";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { Product, FilterOptions } from "@/types";
import { StorageManager, STORAGE_KEYS } from "@/lib/storage";
import {
  Shield,
  Clock,
  Star,
  Zap,
  Globe,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Menu,
  X,
  User,
  LogOut,
  Heart,
  ShoppingCart,
  Bell,
  Search,
  MapPin,
  Calendar,
  DollarSign,
  Filter,
  SortAsc,
  Grid,
  List,
  Bookmark,
  Share2,
  MessageCircle,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  PlayCircle,
  Download,
  Wifi,
  Truck,
  CreditCard,
  SmartphoneIcon as Smartphone,
  Headphones,
  Camera,
  Monitor,
  Gamepad2,
  Music,
  BookOpen,
  Home,
  Car,
  Wrench,
  Dumbbell,
  Palette,
  ChefHat,
  Baby,
  Gift,
  Package,
  Target,
  TrendingDown,
  Activity,
  BarChart3,
  Plus,
  Minus
} from "lucide-react";

export default function QamrahLandingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-white font-medium text-lg">Loading amazing products...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    }>
      <QamrahContent />
    </Suspense>
  );
}

function QamrahContent() {
  const { user, isAuthenticated, signOut, loading: authLoading } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Partial<FilterOptions>>({});
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const storage = StorageManager.getInstance();
  const favorites: string[] = [];

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotating hero slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mock analytics with real-time effect
  const [analytics, setAnalytics] = useState({
    activeProducts: 1247,
    totalUsers: 15420,
    totalBookings: 892,
    averageRating: 4.8,
    totalRevenue: 125630
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        totalBookings: prev.totalBookings + Math.floor(Math.random() * 2)
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Load initial data with enhanced sample products
  useEffect(() => {
    const loadData = async () => {
      const sampleProducts: Product[] = [
        {
          id: '1',
          name: 'Professional Camera Kit',
          description: 'Complete photography setup with DSLR camera, multiple lenses, and professional accessories. Perfect for events, portraits, and commercial photography.',
          category: 'Electronics',
          price: 75,
          deposit: 200,
          status: 'active',
          owner: 'Sarah Chen',
          ownerId: 'owner1',
          location: 'San Francisco, CA',
          rating: 4.9,
          image: '📷',
          images: ['📷', '📸', '🎥'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          views: 1234,
          bookings: 89,
          tags: ['photography', 'professional', 'camera', 'events'],
          availability: {
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            unavailableDates: []
          },
          featured: true,
          condition: 'excellent',
          minRentalDays: 1,
          maxRentalDays: 7,
          deliveryOptions: {
            pickup: true,
            delivery: true,
            deliveryFee: 15,
            deliveryRadius: 25
          },
          specifications: {
            'Camera': 'Canon EOS R5 Mirrorless',
            'Lenses': '24-70mm f/2.8, 70-200mm f/2.8',
            'Accessories': 'Professional Tripod, Flash Kit, Memory Cards, Batteries'
          },
          policies: {
            cancellation: 'Free cancellation up to 24 hours before rental',
            damage: 'Renter responsible for damages beyond normal wear',
            lateFee: 50
          }
        },
        {
          id: '2',
          name: 'MacBook Pro M3 Max',
          description: 'Latest MacBook Pro with M3 Max chip, 32GB RAM, 1TB SSD. Perfect for video editing, development, and creative work.',
          category: 'Electronics',
          price: 120,
          deposit: 800,
          status: 'active',
          owner: 'Alex Rodriguez',
          ownerId: 'owner2',
          location: 'New York, NY',
          rating: 4.8,
          image: '💻',
          images: ['💻', '⌨️', '🖱️'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          views: 892,
          bookings: 45,
          tags: ['laptop', 'apple', 'professional', 'development'],
          availability: {
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            unavailableDates: []
          },
          featured: true,
          condition: 'excellent',
          minRentalDays: 3,
          maxRentalDays: 30,
          deliveryOptions: {
            pickup: true,
            delivery: true,
            deliveryFee: 25,
            deliveryRadius: 30
          },
          specifications: {
            'Model': 'MacBook Pro 16-inch M3 Max',
            'RAM': '32GB Unified Memory',
            'Storage': '1TB SSD',
            'Included': 'Charger, USB-C Hub, Mouse'
          },
          policies: {
            cancellation: 'Free cancellation up to 48 hours before rental',
            damage: 'Full security deposit held until return inspection',
            lateFee: 75
          }
        },
        {
          id: '3',
          name: 'DJI Mavic Air 2S Drone',
          description: 'Professional drone with 4K camera, 3-axis gimbal, and advanced flight features. Perfect for aerial photography and videography.',
          category: 'Electronics',
          price: 95,
          deposit: 400,
          status: 'active',
          owner: 'Michael Kim',
          ownerId: 'owner3',
          location: 'Los Angeles, CA',
          rating: 4.9,
          image: '🚁',
          images: ['🚁', '📹', '🎮'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          views: 756,
          bookings: 34,
          tags: ['drone', 'aerial', 'photography', 'video'],
          availability: {
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            unavailableDates: []
          },
          featured: true,
          condition: 'excellent',
          minRentalDays: 1,
          maxRentalDays: 5,
          deliveryOptions: {
            pickup: true,
            delivery: true,
            deliveryFee: 20,
            deliveryRadius: 20
          },
          specifications: {
            'Camera': '4K/60fps, 20MP Photos',
            'Flight Time': '31 minutes',
            'Range': '12km',
            'Included': 'Controller, Extra Batteries, Case'
          },
          policies: {
            cancellation: 'Free cancellation up to 24 hours before rental',
            damage: 'Pilot certification required, full insurance coverage',
            lateFee: 100
          }
        },
        {
          id: '4',
          name: 'Tesla Model S Plaid',
          description: 'Luxury electric vehicle with autopilot, premium interior, and incredible performance. Perfect for special occasions and business trips.',
          category: 'Automotive',
          price: 350,
          deposit: 2000,
          status: 'active',
          owner: 'Emma Thompson',
          ownerId: 'owner4',
          location: 'Miami, FL',
          rating: 5.0,
          image: '🚗',
          images: ['🚗', '⚡', '🔋'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          views: 2341,
          bookings: 78,
          tags: ['tesla', 'electric', 'luxury', 'autopilot'],
          availability: {
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            unavailableDates: []
          },
          featured: true,
          condition: 'excellent',
          minRentalDays: 1,
          maxRentalDays: 14,
          deliveryOptions: {
            pickup: true,
            delivery: true,
            deliveryFee: 50,
            deliveryRadius: 50
          },
          specifications: {
            'Model': 'Tesla Model S Plaid 2024',
            'Range': '405 miles',
            'Acceleration': '0-60 mph in 1.99s',
            'Features': 'Autopilot, Premium Audio, Glass Roof'
          },
          policies: {
            cancellation: 'Free cancellation up to 72 hours before rental',
            damage: 'Valid driver license required, age 25+',
            lateFee: 200
          }
        },
        {
          id: '5',
          name: 'Professional Power Tools Set',
          description: 'Complete power tools collection including drill, saw, grinder, and more. Perfect for home renovation and construction projects.',
          category: 'Tools & Equipment',
          price: 45,
          deposit: 150,
          status: 'active',
          owner: 'David Wilson',
          ownerId: 'owner5',
          location: 'Chicago, IL',
          rating: 4.7,
          image: '🔧',
          images: ['🔧', '🔨', '⚡'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          views: 567,
          bookings: 23,
          tags: ['tools', 'construction', 'renovation', 'power-tools'],
          availability: {
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            unavailableDates: []
          },
          featured: false,
          condition: 'good',
          minRentalDays: 1,
          maxRentalDays: 7,
          deliveryOptions: {
            pickup: true,
            delivery: true,
            deliveryFee: 10,
            deliveryRadius: 15
          },
          specifications: {
            'Drill': 'Cordless Impact Drill 18V',
            'Saw': 'Circular Saw + Reciprocating Saw',
            'Grinder': 'Angle Grinder 9-inch',
            'Included': 'Tool Box, Batteries, Chargers'
          },
          policies: {
            cancellation: 'Free cancellation up to 24 hours before rental',
            damage: 'Safety demonstration required before use',
            lateFee: 30
          }
        },
        {
          id: '6',
          name: 'Designer Evening Gown Collection',
          description: 'Elegant designer gowns for special events, galas, and formal occasions. Various sizes and styles available.',
          category: 'Fashion',
          price: 85,
          deposit: 300,
          status: 'active',
          owner: 'Isabella Garcia',
          ownerId: 'owner6',
          location: 'Beverly Hills, CA',
          rating: 4.9,
          image: '👗',
          images: ['👗', '💎', '👠'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          views: 1123,
          bookings: 56,
          tags: ['designer', 'formal', 'gown', 'luxury'],
          availability: {
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            unavailableDates: []
          },
          featured: true,
          condition: 'excellent',
          minRentalDays: 1,
          maxRentalDays: 3,
          deliveryOptions: {
            pickup: true,
            delivery: true,
            deliveryFee: 30,
            deliveryRadius: 25
          },
          specifications: {
            'Designers': 'Versace, Chanel, Dior',
            'Sizes': 'XS to XL available',
            'Styles': 'Ball Gown, Mermaid, A-Line',
            'Included': 'Professional Cleaning, Garment Bag'
          },
          policies: {
            cancellation: 'Free cancellation up to 48 hours before rental',
            damage: 'Professional cleaning included, damage fees apply',
            lateFee: 50
          }
        }
      ];
      
      setProducts(sampleProducts);
      setLoading(false);
    };

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.location.toLowerCase().includes(query) ||
          product.owner.toLowerCase().includes(query) ||
          (product.tags || []).some(tag => tag.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Location filter
      if (filters.location && !product.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Price filter
      if (filters.priceRange && product.price > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (filters.rating && product.rating < filters.rating) {
        return false;
      }

      // Condition filter
      if (filters.condition && product.condition !== filters.condition) {
        return false;
      }

      // Status filter (only show active products on landing page)
      if (product.status !== "active") {
        return false;
      }

      return true;
    });

    // Sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        const order = filters.sortOrder === 'desc' ? -1 : 1;
        switch (filters.sortBy) {
          case 'price':
            return (a.price - b.price) * order;
          case 'rating':
            return (a.rating - b.rating) * order;
          case 'newest':
            return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * order;
          case 'popular':
            return (a.views - b.views) * order;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [products, searchQuery, filters]);

  const handleProductView = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleFavoriteToggle = (productId: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    // Handle favorites logic here
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  const heroSlides = [
    {
      title: "Rent Premium Technology",
      subtitle: "Access the latest gadgets and professional equipment",
      bg: "from-blue-600 to-indigo-700",
      icon: Smartphone
    },
    {
      title: "Luxury Cars & Vehicles",
      subtitle: "Drive your dream car for any occasion",
      bg: "from-purple-600 to-pink-700",
      icon: Car
    },
    {
      title: "Professional Equipment",
      subtitle: "Get the tools you need for any project",
      bg: "from-emerald-600 to-teal-700",
      icon: Camera
    }
  ];

  const categories = [
    { name: "Electronics", icon: Smartphone, count: 2847, color: "from-blue-500 to-cyan-500" },
    { name: "Automotive", icon: Car, count: 1239, color: "from-red-500 to-orange-500" },
    { name: "Tools & Equipment", icon: Wrench, count: 1856, color: "from-gray-600 to-gray-700" },
    { name: "Fashion", icon: Sparkles, count: 967, color: "from-pink-500 to-purple-500" },
    { name: "Sports & Outdoor", icon: Dumbbell, count: 1345, color: "from-green-500 to-emerald-500" },
    { name: "Home & Garden", icon: Home, count: 892, color: "from-amber-500 to-yellow-500" },
    { name: "Party & Events", icon: Gift, count: 623, color: "from-purple-500 to-indigo-500" },
    { name: "Music & Audio", icon: Music, count: 445, color: "from-teal-500 to-cyan-500" }
  ];

  const stats = [
    { 
      label: "Active Products", 
      value: analytics.activeProducts.toLocaleString(), 
      icon: Package,
      color: "from-blue-500 to-blue-600",
      trend: "+12%"
    },
    { 
      label: "Happy Users", 
      value: analytics.totalUsers.toLocaleString(), 
      icon: Users,
      color: "from-emerald-500 to-emerald-600",
      trend: "+23%"
    },
    { 
      label: "Total Bookings", 
      value: analytics.totalBookings.toLocaleString(), 
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      trend: "+18%"
    },
    { 
      label: "Revenue Generated", 
      value: `$${(analytics.totalRevenue / 1000).toFixed(0)}K`, 
      icon: DollarSign,
      color: "from-amber-500 to-amber-600",
      trend: "+31%"
    },
  ];

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-white font-medium text-lg">Loading amazing products...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Qamrah
                </span>
                <p className="text-xs text-gray-500 -mt-1">Premium Rentals</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#features" className={`font-medium transition-colors hover:text-indigo-600 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                Features
              </a>
              <a href="#products" className={`font-medium transition-colors hover:text-indigo-600 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                Products
              </a>
              <a href="#categories" className={`font-medium transition-colors hover:text-indigo-600 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                Categories
              </a>
              {isAuthenticated && user?.role === 'admin' && (
                <a href="/admin" className={`font-medium transition-colors hover:text-indigo-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}>
                  Admin
                </a>
              )}
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="relative">
                    <Heart className="w-4 h-4 mr-2" />
                    Favorites
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      3
                    </span>
                  </Button>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
                      {user?.name}
                    </span>
                    <Button variant="ghost" size="sm" onClick={signOut}>
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <User className="w-4 h-4 mr-2" />
                  Join Qamrah
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className={isScrolled ? 'text-gray-700' : 'text-white'}
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col space-y-3">
                <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors px-4 py-2">
                  Features
                </a>
                <a href="#products" className="text-gray-600 hover:text-indigo-600 transition-colors px-4 py-2">
                  Products
                </a>
                <a href="#categories" className="text-gray-600 hover:text-indigo-600 transition-colors px-4 py-2">
                  Categories
                </a>
                {isAuthenticated && user?.role === 'admin' && (
                  <a href="/admin" className="text-gray-600 hover:text-indigo-600 transition-colors px-4 py-2">
                    Admin
                  </a>
                )}
                {!isAuthenticated && (
                  <Button 
                    onClick={() => setShowAuthModal(true)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-full mx-4"
                  >
                    Join Qamrah
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section with Slideshow */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          
          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-indigo-500/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-500/20 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 right-1/3 w-8 h-8 bg-cyan-500/20 rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          {/* Hero Slideshow */}
          <div className="mb-8">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute'
                }`}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${slide.bg} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce`}>
                  <slide.icon className="w-10 h-10 text-white" />
                </div>
                <Badge className="mb-6 bg-white/20 text-white border-0 px-6 py-3 text-sm font-medium backdrop-blur-sm">
                  ⚡ {slide.subtitle}
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white leading-tight">
                  {slide.title}
                </h1>
              </div>
            ))}
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join the future of sharing economy. Rent premium items from verified owners, 
            save money, and reduce waste. From luxury cars to professional equipment.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg px-12 py-6 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Zap className="mr-3 w-6 h-6" />
              Explore Products
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-12 py-6 rounded-2xl border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              <PlayCircle className="mr-3 w-6 h-6" />
              Watch Demo
            </Button>
          </div>

          {/* Enhanced Stats with Animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300 mb-2">{stat.label}</div>
                <div className="text-xs text-emerald-300 font-medium flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-indigo-100 text-indigo-700 border-0 px-6 py-3 text-sm font-medium">
              🎯 Popular Categories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover amazing products across all categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white cursor-pointer group overflow-hidden"
                onClick={() => setFilters({ category: category.name })}
              >
                <CardContent className="p-6 text-center relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{category.count.toLocaleString()} items</p>
                  <div className="flex items-center justify-center text-indigo-600 group-hover:text-indigo-700">
                    <span className="text-sm font-medium mr-1">Browse</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  
                  {/* Decorative background */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${category.color} opacity-10 rounded-full transform translate-x-8 -translate-y-8`}></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 px-6 py-3 text-sm font-medium">
              ✨ Why Choose Qamrah
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              The Future of Renting
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the next generation of rental marketplace with cutting-edge features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Shield,
                title: "Bank-Level Security",
                description: "Advanced encryption, verified users, comprehensive insurance coverage, and 24/7 fraud monitoring for complete peace of mind.",
                color: "from-emerald-500 to-emerald-600",
                features: ["256-bit SSL encryption", "Identity verification", "Payment protection", "24/7 monitoring"]
              },
              {
                icon: Zap,
                title: "Instant Everything",
                description: "Book instantly, get approved in minutes, smart contracts for payments, and real-time notifications throughout your rental.",
                color: "from-blue-500 to-blue-600",
                features: ["Instant booking", "Quick approval", "Smart payments", "Real-time updates"]
              },
              {
                icon: Star,
                title: "Premium Quality",
                description: "Curated marketplace with quality-checked items, professional cleaning, expert reviews, and satisfaction guarantee.",
                color: "from-amber-500 to-amber-600",
                features: ["Quality checked", "Professional cleaning", "Expert reviews", "100% guarantee"]
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white group overflow-hidden">
                <CardHeader className="text-center pb-6 relative">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900 mb-3">
                    {feature.title}
                  </CardTitle>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  
                  {/* Feature list */}
                  <div className="space-y-2">
                    {feature.features.map((item, i) => (
                      <div key={i} className="flex items-center justify-center text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                        {item}
                      </div>
                    ))}
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 opacity-20 rounded-full transform translate-x-16 -translate-y-16"></div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="text-center">
            <p className="text-gray-500 mb-8">Trusted by leading companies worldwide</p>
            <div className="flex justify-center items-center space-x-12 opacity-60">
              {['Google', 'Apple', 'Microsoft', 'Amazon', 'Meta'].map((company, index) => (
                <div key={index} className="text-2xl font-bold text-gray-400">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section with Enhanced Design */}
      <section id="products" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-purple-100 text-purple-700 border-0 px-6 py-3 text-sm font-medium">
              🔥 Featured Products
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Discover Premium Rentals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked items from verified owners with exceptional ratings
            </p>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search luxury cars, professional cameras, designer items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-indigo-500 rounded-2xl outline-none transition-all duration-300 bg-white shadow-lg"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Enhanced Filter Controls */}
                <div className="flex items-center gap-3">
                  <Button
                    variant={showFilters ? "default" : "outline"}
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 px-6 py-4 rounded-2xl"
                  >
                    <Filter className="w-5 h-5" />
                    <span>Filters</span>
                    {Object.keys(filters).length > 0 && (
                      <Badge className="ml-2 bg-red-500 text-white">
                        {Object.keys(filters).length}
                      </Badge>
                    )}
                  </Button>

                  {/* View Mode Toggle */}
                  <div className="flex border-2 border-gray-200 rounded-2xl p-1 bg-white shadow-lg">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-xl"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-xl"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Advanced Filters Panel */}
              {showFilters && (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-6">
                  <SearchFilters
                    onSearch={setSearchQuery}
                    onFilter={setFilters}
                    onClearFilters={clearFilters}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Results Summary with Enhanced Design */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {filteredProducts.length} Premium Products
                </p>
                <p className="text-sm text-gray-500">
                  From {products.filter(p => p.status === 'active').length} total active listings
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <SortAsc className="w-4 h-4" />
                <span>Sort by:</span>
              </div>
              <select
                value={`${filters.sortBy || 'newest'}-${filters.sortOrder || 'desc'}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  setFilters(prev => ({ ...prev, sortBy: sortBy as any, sortOrder: sortOrder as any }));
                }}
                className="text-sm border-2 border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-indigo-500 bg-white shadow-sm"
              >
                <option value="newest-desc">Newest First</option>
                <option value="popular-desc">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
              </select>
              
              {Object.keys(filters).length > 0 && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Enhanced Products Grid */}
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "space-y-6"
          }>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={handleProductView}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorite={favorites.includes(product.id)}
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* Enhanced Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                No products found
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
                We couldn't find any products matching your criteria. Try adjusting your search or filters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={clearFilters} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl">
                  <X className="w-5 h-5 mr-2" />
                  Clear All Filters
                </Button>
                <Button variant="outline" className="px-8 py-3 rounded-xl">
                  <Search className="w-5 h-5 mr-2" />
                  Browse All Categories
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works with Enhanced Design */}
      <section id="how-it-works" className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 px-6 py-3 text-sm font-medium">
              🚀 Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Rent in 3 Easy Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes with our streamlined rental process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                title: "Search & Discover",
                description: "Browse thousands of premium items with advanced filters. View detailed photos, specifications, and verified owner profiles.",
                icon: Search,
                color: "from-blue-500 to-cyan-500",
                features: ["Advanced search", "Detailed listings", "Verified owners", "Multiple photos"]
              },
              {
                step: "2",
                title: "Book & Pay Securely",
                description: "Reserve instantly with our secure payment system. Choose delivery options and get instant confirmation.",
                icon: CreditCard,
                color: "from-emerald-500 to-teal-500",
                features: ["Instant booking", "Secure payments", "Flexible delivery", "Real-time confirmation"]
              },
              {
                step: "3",
                title: "Enjoy & Return",
                description: "Use your rented item with confidence. Return easily and rate your experience to help the community.",
                icon: Sparkles,
                color: "from-purple-500 to-pink-500",
                features: ["Quality guarantee", "Easy returns", "Community ratings", "24/7 support"]
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative group">
                {/* Step number */}
                <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-transform`}>
                  <span className="text-white text-2xl font-bold">{step.step}</span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl transition-shadow">
                  <step.icon className="w-8 h-8 text-gray-700" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {step.features.map((feature, i) => (
                    <div key={i} className="flex items-center justify-center text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Connection line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 -right-6 transform translate-x-full">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Button
              size="lg"
              onClick={() => !isAuthenticated ? setShowAuthModal(true) : document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg px-12 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Zap className="mr-3 w-6 h-6" />
              {isAuthenticated ? 'Start Renting Now' : 'Get Started Today'}
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-8 bg-white/20 text-white border-0 px-6 py-3 text-sm font-medium backdrop-blur-sm">
              🎉 Join the Revolution
            </Badge>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
              Ready to Transform
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Your Lifestyle?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands of smart consumers who've discovered the future of ownership. 
              Rent premium items, save money, and live sustainably.
            </p>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: DollarSign, title: "Save 70% or more", desc: "vs buying new" },
                { icon: Globe, title: "Access everything", desc: "without owning" },
                { icon: Sparkles, title: "Try before buying", desc: "make smart decisions" }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                onClick={() => !isAuthenticated ? setShowAuthModal(true) : document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black font-semibold text-lg px-12 py-6 rounded-2xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="mr-3 w-6 h-6" />
                {isAuthenticated ? 'Start Renting Today' : 'Join Qamrah Now'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-12 py-6 rounded-2xl border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                <Download className="mr-3 w-6 h-6" />
                Download App
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex items-center justify-center space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{analytics.totalUsers.toLocaleString()}+ users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>100% secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Brand section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">Qamrah</span>
                  <p className="text-gray-400 text-sm">Premium Rentals</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                The world's most trusted rental marketplace. Connecting people with the items they need, 
                when they need them. Building a sustainable future through shared resources.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <Button key={index} variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl">
                    <Icon className="w-5 h-5" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Links sections */}
            {[
              {
                title: "Platform",
                links: ["Browse Products", "List Your Items", "How It Works", "Pricing", "Mobile App"]
              },
              {
                title: "Support",
                links: ["Help Center", "Safety Guidelines", "Trust & Safety", "Community", "Contact Us"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Press Kit", "Blog", "Investors"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg mb-6 text-white">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="max-w-md mx-auto text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-6">Get the latest products and exclusive offers</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                />
                <Button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2024 Qamrah. All rights reserved. Building a sustainable future through sharing.
            </p>
            <div className="flex items-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@qamrah.com</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onFavoriteToggle={handleFavoriteToggle}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        isAuthenticated={isAuthenticated}
        onAuthRequired={() => setShowAuthModal(true)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          // Refresh the page or update state as needed
        }}
      />
    </div>
  );
}
