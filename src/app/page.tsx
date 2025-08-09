"use client";
"use client";

import { Suspense } from "react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { SearchFilters } from "@/components/SearchFilters";
import { useProducts } from "@/hooks/useProducts";
import { Product, FilterOptions } from "@/types";
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
} from "lucide-react";

export default function QamrahLandingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing products...</p>
        </div>
      </div>
    }>
      <QamrahContent />
    </Suspense>
  );
}

function QamrahContent() {
  const { products, loading, incrementViews } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Partial<FilterOptions>>({});
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.location.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query));
        
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

      return true;
    });
  }, [products, searchQuery, filters]);

  const handleProductView = (product: Product) => {
    incrementViews(product.id);
    setSelectedProduct(product);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  const stats = [
    { label: "Active Products", value: products.filter(p => p.status === "active").length.toString(), icon: Globe },
    { label: "Happy Users", value: "25,000+", icon: Users },
    { label: "Total Bookings", value: products.reduce((sum, p) => sum + (p.bookings || 0), 0).toString(), icon: TrendingUp },
    { label: "Average Rating", value: "4.8", icon: Award },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Qamrah
                </span>
                <p className="text-xs text-gray-500 -mt-1">Rent Anything, Anywhere</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Features
              </a>
              <a href="#products" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Products
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                How it Works
              </a>
              <a href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Admin
              </a>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="flex flex-col space-y-3">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </a>
                <a href="#products" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Products
                </a>
                <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                  How it Works
                </a>
                <a href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Admin
                </a>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white w-full">
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <Badge className="mb-8 bg-gray-900 text-white border-0 px-6 py-3 text-sm font-medium shadow-lg">
            ⚡ Trusted by 25,000+ global renters
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Rent Anything,
            </span>
            <br />
            <span className="text-gray-900">Anywhere, Anytime</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover amazing products to rent from trusted owners worldwide. From professional equipment to everyday items, find what you need without the commitment of buying.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white text-lg px-10 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Zap className="mr-3 w-6 h-6" />
              Start Exploring
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-6 rounded-2xl border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-gray-700" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Why Choose Qamrah?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make renting simple, safe, and convenient for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Safe & Secure",
                description: "All users are verified and products are insured. Your safety is our top priority with 24/7 support and secure payments.",
                color: "from-emerald-500 to-emerald-600"
              },
              {
                icon: Clock,
                title: "Instant Booking",
                description: "Book items instantly with our streamlined process. No waiting, no hassle, just pure convenience at your fingertips.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Star,
                title: "Quality Guaranteed",
                description: "Every product is quality-checked and rated by our community. Only the best makes it to our platform.",
                color: "from-amber-500 to-amber-600"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white">
                <CardHeader className="text-center pb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Discover Amazing Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse and rent from our curated collection of high-quality items
            </p>
          </div>

          <SearchFilters
            onSearch={setSearchQuery}
            onFilter={setFilters}
            onClearFilters={clearFilters}
          />

          <div className="mt-8">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onView={handleProductView}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Search & Discover",
                description: "Browse thousands of items available for rent in your area. Filter by category, price, and location with our smart search.",
                icon: "🔍"
              },
              {
                step: "2",
                title: "Book & Pay",
                description: "Reserve your item with secure payment. Choose your rental period and pickup/delivery options seamlessly.",
                icon: "💳"
              },
              {
                step: "3",
                title: "Enjoy & Return",
                description: "Use your rented item and return it on time. Leave a review to help build our trusted community.",
                icon: "✨"
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-2xl">
                  {step.step}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-10 -right-6 w-6 h-6 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Start Your Rental Journey?
          </h2>
          <p className="text-xl mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of people who are already saving money and discovering amazing products through Qamrah.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-10 py-6 rounded-2xl shadow-xl"
            >
              <Zap className="mr-3 w-6 h-6" />
              Start Renting Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-6 rounded-2xl border-2 border-white text-white hover:bg-white hover:text-gray-900"
            >
              List Your Items
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Qamrah</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The trusted marketplace for renting anything you need, anywhere you are. Building communities through shared resources.
              </p>
            </div>

            {[
              {
                title: "Company",
                links: ["About Us", "Careers", "Press", "Contact"]
              },
              {
                title: "Support",
                links: ["Help Center", "Safety", "Trust & Safety", "Community"]
              },
              {
                title: "Legal",
                links: ["Terms of Service", "Privacy Policy", "Cookie Policy", "GDPR"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg mb-6 text-white">{section.title}</h3>
                <ul className="space-y-3 text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Qamrah. All rights reserved. Building a sustainable future through sharing.</p>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}