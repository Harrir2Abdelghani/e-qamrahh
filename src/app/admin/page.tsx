"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Product, Analytics } from "@/types";
import {
  Shield,
  Globe,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  BarChart3,
  Users,
  Package,
  DollarSign,
  Activity,
  TrendingUp,
  Calendar,
  Star,
  LogOut,
  Settings,
  Bell,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboard() {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const analytics: Analytics = useMemo(() => ({
    totalProducts: products.length,
    totalUsers: 8500,
    totalRevenue: products.reduce((sum, p) => sum + (p.price * p.bookings), 0),
    activeRentals: products.reduce((sum, p) => sum + p.bookings, 0),
    monthlyGrowth: 23.5,
    topCategories: [
      { name: "Electronics", count: products.filter(p => p.category === "Electronics").length },
      { name: "Tools & Equipment", count: products.filter(p => p.category === "Tools & Equipment").length },
      { name: "Sports & Outdoor", count: products.filter(p => p.category === "Sports & Outdoor").length },
    ].sort((a, b) => b.count - a.count),
    recentActivity: [
      { type: "booking", message: "New booking for Professional Camera Kit", timestamp: "2 minutes ago" },
      { type: "product", message: "New product added: Designer Evening Gown", timestamp: "15 minutes ago" },
      { type: "user", message: "New user registered: john.doe@email.com", timestamp: "1 hour ago" },
    ]
  }), [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = searchTerm === "" || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.owner.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || product.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [products, searchTerm, statusFilter]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials. Use admin/admin");
    }
  };

  const handleAddProduct = (productData: Omit<Product, "id" | "createdAt" | "updatedAt" | "views" | "bookings">) => {
    addProduct(productData);
    setShowAddProduct(false);
  };

  const handleUpdateProduct = (productData: Product) => {
    updateProduct(productData.id, productData);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Admin Portal</CardTitle>
            <p className="text-gray-600 mt-2">Access Qamrah Admin Dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-gray-900"
                  placeholder="Enter username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-gray-900"
                  placeholder="Enter password"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white text-lg font-medium shadow-lg"
              >
                <Shield className="w-5 h-5 mr-2" />
                Sign In
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
              Demo credentials: <strong>admin / admin</strong>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Qamrah Admin</h1>
                <p className="text-sm text-gray-500">Dashboard & Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-emerald-500 text-white px-3 py-1">
                <Activity className="w-3 h-3 mr-1" />
                Live
              </Badge>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Avatar className="w-10 h-10">
                <AvatarImage src="/admin-avatar.jpg" />
                <AvatarFallback className="bg-gray-900 text-white font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAuthenticated(false)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Products",
              value: analytics.totalProducts,
              icon: Package,
              color: "from-blue-500 to-blue-600",
              change: "+12%"
            },
            {
              title: "Total Users",
              value: analytics.totalUsers.toLocaleString(),
              icon: Users,
              color: "from-emerald-500 to-emerald-600",
              change: "+8%"
            },
            {
              title: "Revenue",
              value: `$${analytics.totalRevenue.toLocaleString()}`,
              icon: DollarSign,
              color: "from-purple-500 to-purple-600",
              change: "+23%"
            },
            {
              title: "Active Rentals",
              value: analytics.activeRentals,
              icon: Activity,
              color: "from-amber-500 to-amber-600",
              change: "+15%"
            }
          ].map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-emerald-600 text-sm font-medium mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1 shadow-sm">
            <TabsTrigger value="products" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
                <p className="text-gray-600">Manage all products in the marketplace</p>
              </div>
              <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
                <DialogTrigger asChild>
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Add New Product</DialogTitle>
                  </DialogHeader>
                  <ProductForm onSubmit={handleAddProduct} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Filters */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onView={setViewProduct}
                  onEdit={setEditingProduct}
                  onDelete={handleDeleteProduct}
                  showActions={true}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <Card className="border-0 shadow-sm">
                <CardContent className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                  <Button onClick={() => setSearchTerm("")} variant="outline">
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Growth Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Monthly Growth</span>
                    <span className="text-emerald-600 font-bold text-lg">+{analytics.monthlyGrowth}%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Active Rentals</span>
                    <span className="text-blue-600 font-bold text-lg">{analytics.activeRentals}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Total Revenue</span>
                    <span className="text-purple-600 font-bold text-lg">${analytics.totalRevenue.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Top Categories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analytics.topCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 font-medium">{category.name}</span>
                      <Badge variant="outline" className="font-semibold">
                        {category.count} products
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{activity.message}</p>
                        <p className="text-gray-500 text-sm">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>User Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">User Management</h3>
                <p className="text-gray-600">Advanced user management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>System Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-gray-700">Site Name</Label>
                        <Input defaultValue="Qamrah" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-gray-700">Admin Email</Label>
                        <Input defaultValue="admin@qamrah.com" className="mt-1" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                      <Shield className="w-4 h-4 mr-2" />
                      Update Security Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Edit Product</DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct}
              onSubmit={handleUpdateProduct}
              isEditing={true}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* View Product Modal */}
      {viewProduct && (
        <Dialog open={!!viewProduct} onOpenChange={() => setViewProduct(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Product Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="text-6xl">{viewProduct.image}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{viewProduct.name}</h3>
                  <Badge className={
                    viewProduct.status === "active" ? "bg-emerald-500" :
                    viewProduct.status === "pending" ? "bg-amber-500" : "bg-red-500"
                  }>
                    {viewProduct.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-emerald-600">${viewProduct.price}</div>
                  <div className="text-sm text-gray-500">per day</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Category:</strong> {viewProduct.category}</div>
                <div><strong>Owner:</strong> {viewProduct.owner}</div>
                <div><strong>Location:</strong> {viewProduct.location}</div>
                <div><strong>Rating:</strong> {viewProduct.rating} ⭐</div>
                <div><strong>Views:</strong> {viewProduct.views}</div>
                <div><strong>Bookings:</strong> {viewProduct.bookings}</div>
              </div>
              
              <div>
                <strong>Description:</strong>
                <p className="text-gray-600 mt-1">{viewProduct.description}</p>
              </div>
              
              <div>
                <strong>Tags:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {viewProduct.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function ProductForm({ 
  product, 
  onSubmit, 
  isEditing = false 
}: { 
  product?: Product; 
  onSubmit: (product: any) => void; 
  isEditing?: boolean;
}) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    price: product?.price?.toString() || "",
    description: product?.description || "",
    owner: product?.owner || "",
    location: product?.location || "",
    image: product?.image || "📦",
    status: product?.status || "pending",
    tags: product?.tags?.join(", ") || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean),
      availability: {
        startDate: "2024-02-01",
        endDate: "2024-12-31"
      }
    };

    if (isEditing && product) {
      onSubmit({ ...product, ...productData });
    } else {
      onSubmit(productData);
    }
  };

  const categories = [
    "Electronics",
    "Tools & Equipment", 
    "Sports & Outdoor",
    "Party & Events",
    "Fashion",
    "Home & Garden",
    "Automotive",
    "Books & Media"
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Product Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Price per Day ($)</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="0.00"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Owner</Label>
          <Input
            value={formData.owner}
            onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
            placeholder="Owner name"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="City, State"
            required
          />
        </div>
        {isEditing && (
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Product description..."
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Tags (comma-separated)</Label>
        <Input
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="e.g., professional, photography, events"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="submit"
          className="bg-gray-900 hover:bg-gray-800 text-white"
        >
          {isEditing ? (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Update Product
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </>
          )}
        </Button>
      </div>
    </form>
  );
}