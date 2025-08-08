"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Shield,
  Clock,
  Star,
  Search,
  Heart,
  MapPin,
  Users,
  ArrowRight,
  CheckCircle,
  Menu,
  X,
  Sparkles,
  Zap,
  Globe,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  status: "active" | "inactive" | "pending";
  owner: string;
  location: string;
  rating: number;
  image: string;
  description: string;
}

export default function QamrahLandingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("qamrah-products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // fallback: show nothing or could initialize with defaults if desired
      setProducts([]);
    }
  }, []);

  // Optionally, update products if localStorage changes (e.g. admin tab open in another tab)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "qamrah-products") {
        setProducts(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: (products.length + 1).toString(),
    };
    setProducts([...products, newProduct]);
    setShowAddProduct(false);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null);
  };

  const deleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Navigation */}
      <nav className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
              <Globe className="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                Qamrah
              </span>
              <p className="text-xs text-gray-500 -mt-1">
                Global Rental Network
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              How it Works
            </a>
            <a
              href="#products"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Products
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Reviews
            </a>
            <Button className="bg-gray-700 hover:bg-gray-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-2" />
              Start Exploring
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center max-w-5xl mx-auto">
          <Badge className="mb-8 bg-gray-700 text-white border-0 px-6 py-3 text-sm font-medium shadow-lg">
            ⚡ Trusted by 25,000+ global renters
          </Badge>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 bg-clip-text text-transparent">
              Rent Anything,
            </span>
            <br />
            <span className="text-gray-900">Anywhere</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover amazing products to rent from trusted global owners. From
            tools to tech, find what you need without the commitment of buying.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-gray-700 hover:bg-gray-800 text-white text-lg px-10 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0"
            >
              <Zap className="mr-3 w-6 h-6" />
              Start Renting Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-6 rounded-2xl border-2 border-gray-600 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300"
            >
              <Search className="mr-3 w-6 h-6" />
              Browse Products
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-gray-900">
            Why Choose Qamrah?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make renting simple, safe, and convenient for everyone
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-white border border-gray-200 rounded-xl">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">
                Safe & Secure
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-lg text-gray-600 leading-relaxed">
                All users are verified and products are insured. Your safety is
                our top priority with 24/7 support.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-white border border-gray-200 rounded-xl">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">
                Instant Booking
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-lg text-gray-600 leading-relaxed">
                Book items instantly with our streamlined process. No waiting,
                no hassle, just pure convenience.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-white border border-gray-200 rounded-xl">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Star className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">
                Quality Guaranteed
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-lg text-gray-600 leading-relaxed">
                Every product is quality-checked and rated by our community.
                Only the best makes it to our platform.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products"
        className="container mx-auto px-6 py-24 bg-gray-100"
      >
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-gray-900">
            Available Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse and rent amazing products from our community
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:border-gray-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-gray-500"
            >
              <option value="all">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Tools & Equipment">Tools & Equipment</option>
              <option value="Sports & Outdoor">Sports & Outdoor</option>
              <option value="Party & Events">Party & Events</option>
              <option value="Dress">Dress</option>
              <option value="Clothes">Clothes</option>
              <option value="Jewelleries">Jewelleries</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border border-gray-200 rounded-xl"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{product.image}</div>
                  <Badge
                    className={
                      product.status === "active"
                        ? "bg-green-500"
                        : product.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }
                  >
                    {product.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-gray-500">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="text-gray-900">{product.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Price:</span>
                  <span className="text-green-400 font-semibold">
                    ${product.price}/day
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Owner:</span>
                  <span className="text-gray-900">{product.owner}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Location:</span>
                  <span className="text-gray-900">{product.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-900">{product.rating}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-4">
                  <Button
                    size="sm"
                    className="flex-1 bg-gray-700 hover:bg-gray-800 text-white"
                    onClick={() => setViewProduct(product)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="container mx-auto px-6 py-24 bg-gray-100 rounded-3xl mx-8 mb-24"
      >
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-gray-900">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in just three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="text-center relative">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-8 text-white text-3xl font-bold shadow-2xl">
              1
            </div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              Search & Discover
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Browse thousands of items available for rent in your area. Filter
              by category, price, and location with our smart search.
            </p>
          </div>

          <div className="text-center relative">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-8 text-white text-3xl font-bold shadow-2xl">
              2
            </div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              Book & Pay
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Reserve your item with secure payment. Choose your rental period
              and pickup/delivery options seamlessly.
            </p>
          </div>

          <div className="text-center relative">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-8 text-white text-3xl font-bold shadow-2xl">
              3
            </div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              Enjoy & Return
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Use your rented item and return it on time. Leave a review to help
              build our trusted community.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section id="categories" className="container mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-gray-900">
            Popular Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find what you need across thousands of categories
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              name: "Tools & Equipment",
              icon: "🔧",
              count: "2,500+ items",
              color: "from-gray-700 to-gray-900",
            },
            {
              name: "Electronics",
              icon: "📱",
              count: "1,800+ items",
              color: "from-gray-700 to-gray-900",
            },
            {
              name: "Sports & Outdoor",
              icon: "⚽",
              count: "3,200+ items",
              color: "from-gray-700 to-gray-900",
            },
            {
              name: "Party & Events",
              icon: "🎉",
              count: "1,500+ items",
              color: "from-gray-700 to-gray-900",
            },
          ].map((category, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-gray-100 border border-gray-200 rounded-xl cursor-pointer"
            >
              <CardContent className="text-center p-8">
                <div className="text-5xl mb-6">{category.icon}</div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">
                  {category.name}
                </h3>
                <p className="text-gray-600 font-medium">{category.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="container mx-auto px-6 py-24 bg-gray-100 rounded-3xl mx-8 mb-24"
      >
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-gray-900">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied renters and owners
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              name: "Sarah Johnson",
              role: "Event Planner",
              content:
                "Qamrah saved my event! I rented all the equipment I needed for a fraction of the cost. The quality was amazing!",
              rating: 5,
            },
            {
              name: "Mike Chen",
              role: "DIY Enthusiast",
              content:
                "Perfect for weekend projects. I can try expensive tools without buying them. The community is so helpful!",
              rating: 5,
            },
            {
              name: "Emma Davis",
              role: "Student",
              content:
                "As a student, this is perfect for getting what I need without breaking the bank. The app is so easy to use!",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl bg-gray-100 border border-gray-200 hover:shadow-2xl transition-all duration-300 rounded-xl"
            >
              <CardContent className="p-8">
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="bg-gray-700 hover:bg-gray-800 rounded-3xl p-16 text-center text-white shadow-2xl">
          <h2 className="text-5xl font-bold mb-6">Ready to Start Renting?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of people who are already saving money and
            discovering amazing products through Qamrah.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-10 py-6 rounded-2xl bg-white text-gray-900 hover:bg-gray-100 shadow-xl"
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

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Qamrah</span>
              </div>
              <p className="text-gray-500 leading-relaxed">
                The trusted marketplace for renting anything you need, anywhere
                you are. Building communities through shared resources.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6 text-white">Company</h3>
              <ul className="space-y-3 text-gray-500">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6 text-white">Support</h3>
              <ul className="space-y-3 text-gray-500">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Trust & Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6 text-white">Legal</h3>
              <ul className="space-y-3 text-gray-500">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>
              &copy; 2024 Qamrah. All rights reserved. Building a sustainable
              future through sharing.
            </p>
          </div>
        </div>
      </footer>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-white mb-6">
              Add New Product
            </h3>
            <AddProductForm
              onSubmit={addProduct}
              onCancel={() => setShowAddProduct(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-white mb-6">Edit Product</h3>
            <EditProductForm
              product={editingProduct}
              onSubmit={updateProduct}
              onCancel={() => setEditingProduct(null)}
            />
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {viewProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-white mb-6">
              Product Details
            </h3>
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-gray-700 rounded-lg flex items-center justify-center mb-4 text-4xl text-white">
                {viewProduct.image.startsWith("http://") ||
                viewProduct.image.startsWith("https://") ? (
                  <img
                    src={viewProduct.image}
                    alt={viewProduct.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  viewProduct.image
                )}
              </div>
              <CardTitle className="text-3xl font-bold text-white mb-4">
                {viewProduct.name}
              </CardTitle>
              <CardDescription className="text-gray-300 mb-4">
                {viewProduct.description}
              </CardDescription>
              <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
                <span>Category:</span>
                <span>{viewProduct.category}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
                <span>Price:</span>
                <span className="text-green-400 font-semibold">
                  ${viewProduct.price}/day
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
                <span>Owner:</span>
                <span>{viewProduct.owner}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
                <span>Location:</span>
                <span>{viewProduct.location}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
                <span>Rating:</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>{viewProduct.rating}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-4">
                <Button
                  size="sm"
                  className="flex-1 bg-gray-700 hover:bg-gray-800 text-white"
                  onClick={() => setViewProduct(null)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddProductForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (product: Omit<Product, "id">) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    owner: "",
    location: "",
    image: "📦",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      status: "pending" as const,
      rating: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-gray-300 text-sm">Product Name</label>
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
          placeholder="Enter product name"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-gray-300 text-sm">Category</label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
          required
        >
          <option value="">Select category</option>
          <option value="Electronics">Electronics</option>
          <option value="Tools & Equipment">Tools & Equipment</option>
          <option value="Sports & Outdoor">Sports & Outdoor</option>
          <option value="Party & Events">Party & Events</option>
          <option value="Dress">Dress</option>
          <option value="Clothes">Clothes</option>
          <option value="Jewelleries">Jewelleries</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Price per Day ($)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
            placeholder="0.00"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Owner</label>
          <input
            value={formData.owner}
            onChange={(e) =>
              setFormData({ ...formData, owner: e.target.value })
            }
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
            placeholder="Owner name"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-gray-300 text-sm">Location</label>
        <input
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
          placeholder="City, State"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-gray-300 text-sm">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
          placeholder="Product description..."
          rows={3}
          required
        />
      </div>
      <div className="flex space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 border-gray-600 text-gray-300"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-gray-700 hover:bg-gray-800 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>
    </form>
  );
}

function EditProductForm({
  product,
  onSubmit,
  onCancel,
}: {
  product: Product;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: product.name,
    category: product.category,
    price: product.price.toString(),
    description: product.description,
    owner: product.owner,
    location: product.location,
    image: product.image,
    status: product.status,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...product,
      ...formData,
      price: parseFloat(formData.price),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-gray-300 text-sm">Product Name</label>
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Category</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
            required
          >
            <option value="Electronics">Electronics</option>
            <option value="Tools & Equipment">Tools & Equipment</option>
            <option value="Sports & Outdoor">Sports & Outdoor</option>
            <option value="Party & Events">Party & Events</option>
            <option value="Dress">Dress</option>
            <option value="Clothes">Clothes</option>
            <option value="Jewelleries">Jewelleries</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Status</label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value as any })
            }
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
            required
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Price per Day ($)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Owner</label>
          <input
            value={formData.owner}
            onChange={(e) =>
              setFormData({ ...formData, owner: e.target.value })
            }
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-gray-300 text-sm">Location</label>
        <input
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-gray-300 text-sm">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
          rows={3}
          required
        />
      </div>
      <div className="flex space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 border-gray-600 text-gray-300"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-gray-700 hover:bg-gray-800 text-white"
        >
          <Edit className="w-4 h-4 mr-2" />
          Update Product
        </Button>
      </div>
    </form>
  );
}
