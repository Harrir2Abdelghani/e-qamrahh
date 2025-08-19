"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import SearchFilters from "@/components/SearchFilters";
import AuthModal from "@/components/AuthModal";
import {
  Search,
  Filter,
  Plus,
  Heart,
  ShoppingBag,
  User,
  Bell,
  Menu,
  Star,
  TrendingUp,
  Crown,
  Shield,
  LogOut,
  Settings,
  Package,
  Calendar,
  CreditCard,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

export default function HomePage() {
  const { user, isAuthenticated, signOut } = useAuth();
  const { products, loading, addToFavorites, removeFromFavorites, getFavorites, createBooking } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userFavorites, setUserFavorites] = useState<string[]>([]);
  const [userBookings, setUserBookings] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadUserData();
    }
  }, [isAuthenticated]);

  const loadUserData = async () => {
    const favorites = await getFavorites();
    setUserFavorites(favorites);
    // Load user bookings here
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory && product.status === 'active';
  });

  const featuredProducts = products.filter(p => p.featured && p.status === 'active').slice(0, 6);
  const popularProducts = products.filter(p => p.status === 'active').sort((a, b) => b.views - a.views).slice(0, 6);

  const categories = [
    { id: "all", name: "All Categories", count: products.length },
    { id: "dresses", name: "Dresses", count: products.filter(p => p.category.toLowerCase() === "dresses").length },
    { id: "jewelries", name: "Jewelries", count: products.filter(p => p.category.toLowerCase() === "jewelries").length },
    { id: "others", name: "Others", count: products.filter(p => p.category.toLowerCase() === "others").length }
  ];

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleFavoriteToggle = async (productId: string) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    if (userFavorites.includes(productId)) {
      await removeFromFavorites(productId);
      setUserFavorites(prev => prev.filter(id => id !== productId));
    } else {
      await addToFavorites(productId);
      setUserFavorites(prev => [...prev, productId]);
    }
  };

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Qamrah
              </div>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Premium Rentals
              </Badge>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search luxury items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Bell className="w-4 h-4" />
                  </Button>
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {user?.name?.[0] || 'U'}
                      </div>
                      <span className="hidden sm:block">{user?.name}</span>
                    </Button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                        <div className="p-4 border-b">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {user?.name?.[0] || 'U'}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{user?.name}</p>
                              <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setShowProfile(true)}
                          >
                            <User className="w-4 h-4 mr-3" />
                            My Profile
                          </Button>
                          <Button variant="ghost" className="w-full justify-start">
                            <Heart className="w-4 h-4 mr-3" />
                            Favorites ({userFavorites.length})
                          </Button>
                          <Button variant="ghost" className="w-full justify-start">
                            <ShoppingBag className="w-4 h-4 mr-3" />
                            My Bookings
                          </Button>
                          <Button variant="ghost" className="w-full justify-start">
                            <Package className="w-4 h-4 mr-3" />
                            My Listings
                          </Button>
                          <Button variant="ghost" className="w-full justify-start">
                            <Settings className="w-4 h-4 mr-3" />
                            Settings
                          </Button>
                          {user?.role === 'admin' && (
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-purple-600"
                              onClick={() => window.location.href = '/admin'}
                            >
                              <Shield className="w-4 h-4 mr-3" />
                              Admin Dashboard
                            </Button>
                          )}
                          <hr className="my-2" />
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-red-600"
                            onClick={signOut}
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            Sign Out
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={() => openAuth('login')}>
                    Login
                  </Button>
                  <Button onClick={() => openAuth('signup')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Rent Luxury,
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {" "}Live Elegantly
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-purple-100">
              Discover exclusive designer dresses, luxury jewelry, and premium accessories
              for your special moments. Rent, wear, return.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
                <Search className="w-5 h-5 mr-2" />
                Explore Collection
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3">
                <Plus className="w-5 h-5 mr-2" />
                List Your Items
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Premium Items", value: "1,000+", icon: Crown },
              { label: "Happy Customers", value: "5,000+", icon: Star },
              { label: "Cities Served", value: "50+", icon: MapPin },
              { label: "Average Rating", value: "4.9★", icon: TrendingUp }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Collection</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Handpicked luxury items perfect for your special occasions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorited={userFavorites.includes(product.id)}
                  onFavoriteToggle={() => handleFavoriteToggle(product.id)}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories & Filters */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <SearchFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedCategory === "all" ? "All Products" :
                   categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <div className="text-gray-600">
                  {filteredProducts.length} items found
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isFavorited={userFavorites.includes(product.id)}
                      onFavoriteToggle={() => handleFavoriteToggle(product.id)}
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>
              )}

              {filteredProducts.length === 0 && !loading && (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      {popularProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Now</h2>
              <p className="text-xl text-gray-600">Most viewed items this week</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorited={userFavorites.includes(product.id)}
                  onFavoriteToggle={() => handleFavoriteToggle(product.id)}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Qamrah
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                The premier destination for luxury rentals. Discover, rent, and enjoy exclusive
                designer items for your special moments.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Mail className="w-4 h-4 mr-2" />
                  Support
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Dresses</a></li>
                <li><a href="#" className="hover:text-white">Jewelry</a></li>
                <li><a href="#" className="hover:text-white">Accessories</a></li>
                <li><a href="#" className="hover:text-white">Bags</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">How it Works</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Qamrah. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={() => {
            setIsProductModalOpen(false);
            setSelectedProduct(null);
          }}
          onBooking={(bookingData) => {
            // Handle booking
            createBooking(bookingData);
          }}
          isAuthenticated={isAuthenticated}
          onAuthRequired={() => setIsAuthModalOpen(true)}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      {/* User Profile Modal */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>My Profile</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="listings">Listings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                  {user?.name?.[0] || 'U'}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{user?.name}</h3>
                  <p className="text-gray-600">{user?.email}</p>
                  <Badge className="mt-1">
                    {user?.role === 'admin' ? 'Administrator' : 'Member'}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="font-medium">Favorites</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{userFavorites.length}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Bookings</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{userBookings.length}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="favorites">
              <div className="text-center py-8">
                <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your Favorite Items</h3>
                <p className="text-gray-600">Items you've favorited will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="bookings">
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your Bookings</h3>
                <p className="text-gray-600">Your rental history and upcoming bookings</p>
              </div>
            </TabsContent>

            <TabsContent value="listings">
              <div className="text-center py-8">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your Listings</h3>
                <p className="text-gray-600">Items you've listed for rent</p>
                <Button className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Listing
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}