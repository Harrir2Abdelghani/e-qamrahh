"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/hooks/useProducts";
import { 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Star,
  MapPin,
  Calendar,
  Activity,
  BarChart3,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Crown,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw
} from "lucide-react";

export default function AdminDashboard() {
  const { user, isAuthenticated, login } = useAuth();
  const { 
    products, 
    loading, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    getAnalytics,
    refreshProducts 
  } = useProducts();

  const [analytics, setAnalytics] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: 'Dresses',
    price: 0,
    deposit: 0,
    location: '',
    condition: 'excellent' as const,
    min_rental_days: 1,
    max_rental_days: 7,
    images: ['📦'],
    tags: [] as string[],
    specifications: {},
    policies: {
      cancellation: 'Free cancellation up to 24 hours',
      damage: 'Standard damage policy',
      lateFee: 25
    },
    delivery_options: {
      pickup: true,
      delivery: true,
      deliveryFee: 15,
      deliveryRadius: 25
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (isAuthenticated && user?.role === 'admin') {
      loadAnalytics();
    }
  }, [isAuthenticated, user, mounted, products]);

  const loadAnalytics = async () => {
    try {
      const analyticsData = await getAnalytics();
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const result = await addProduct({
        ...newProduct,
        tags: newProduct.tags.length > 0 ? newProduct.tags : ['new'],
      });

      if (result.success) {
        setNewProduct({
          name: '',
          description: '',
          category: 'Dresses',
          price: 0,
          deposit: 0,
          location: '',
          condition: 'excellent',
          min_rental_days: 1,
          max_rental_days: 7,
          images: ['📦'],
          tags: [],
          specifications: {},
          policies: {
            cancellation: 'Free cancellation up to 24 hours',
            damage: 'Standard damage policy',
            lateFee: 25
          },
          delivery_options: {
            pickup: true,
            delivery: true,
            deliveryFee: 15,
            deliveryRadius: 25
          }
        });
        setIsCreateModalOpen(false);
        await refreshProducts();
        await loadAnalytics();
      } else {
        alert(result.error || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const result = await deleteProduct(id);
      if (result.success) {
        await refreshProducts();
        await loadAnalytics();
      } else {
        alert(result.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const result = await updateProduct(id, { status });
      if (result.success) {
        await refreshProducts();
        await loadAnalytics();
      } else {
        alert(result.error || 'Failed to update product status');
      }
    } catch (error) {
      console.error('Error updating product status:', error);
      alert('Failed to update product status');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.owner?.full_name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    const success = await login(loginForm.email, loginForm.password);
    if (!success) {
      setLoginError('Invalid admin credentials');
    }
    setIsLoggingIn(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500';
      case 'pending': return 'bg-amber-500';
      case 'inactive': return 'bg-red-500';
      case 'rented': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  if (!mounted) {
    return null;
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <Shield className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Enter your admin credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                placeholder="admin@qamrah.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                placeholder="Enter admin password"
                required
              />
            </div>
            {loginError && (
              <div className="text-red-600 text-sm">{loginError}</div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Logging in...' : 'Login to Admin Dashboard'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="text-sm"
            >
              Back to Main Site
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (loading && !analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your Qamrah marketplace</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                Admin Access
              </Badge>
              <Button onClick={() => window.location.href = '/'} variant="outline">
                Back to Store
              </Button>
              <Button onClick={refreshProducts} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Products',
              value: analytics?.totalProducts || products.length,
              change: '+12.5%',
              icon: Package,
              color: 'from-blue-500 to-blue-600',
              positive: true
            },
            {
              title: 'Active Products',
              value: analytics?.activeProducts || products.filter(p => p.status === 'active').length,
              change: '+8.2%',
              icon: CheckCircle,
              color: 'from-emerald-500 to-emerald-600',
              positive: true
            },
            {
              title: 'Total Views',
              value: products.reduce((sum, p) => sum + (p.views || 0), 0).toLocaleString(),
              change: '+15.3%',
              icon: Eye,
              color: 'from-purple-500 to-purple-600',
              positive: true
            },
            {
              title: 'Total Bookings',
              value: products.reduce((sum, p) => sum + (p.bookings || 0), 0).toLocaleString(),
              change: '+23.7%',
              icon: Calendar,
              color: 'from-amber-500 to-amber-600',
              positive: true
            }
          ].map((stat, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" />
                      <span className="text-sm font-medium text-emerald-600">
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Product Management</CardTitle>
                  <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-indigo-600 hover:bg-indigo-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Create New Product</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Product Name</Label>
                          <Input
                            id="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                            placeholder="Enter product name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={newProduct.category}
                            onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Dresses">Dresses</SelectItem>
                              <SelectItem value="Jewelries">Jewelries</SelectItem>
                              <SelectItem value="Others">Others</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="price">Price per Day ($)</Label>
                          <Input
                            id="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="deposit">Security Deposit ($)</Label>
                          <Input
                            id="deposit"
                            type="number"
                            value={newProduct.deposit}
                            onChange={(e) => setNewProduct({...newProduct, deposit: Number(e.target.value)})}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={newProduct.location}
                            onChange={(e) => setNewProduct({...newProduct, location: e.target.value})}
                            placeholder="City, State"
                          />
                        </div>
                        <div>
                          <Label htmlFor="condition">Condition</Label>
                          <Select
                            value={newProduct.condition}
                            onValueChange={(value: any) => setNewProduct({...newProduct, condition: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="excellent">Excellent</SelectItem>
                              <SelectItem value="good">Good</SelectItem>
                              <SelectItem value="fair">Fair</SelectItem>
                              <SelectItem value="poor">Poor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="minDays">Min Rental Days</Label>
                          <Input
                            id="minDays"
                            type="number"
                            value={newProduct.min_rental_days}
                            onChange={(e) => setNewProduct({...newProduct, min_rental_days: Number(e.target.value)})}
                            placeholder="1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="maxDays">Max Rental Days</Label>
                          <Input
                            id="maxDays"
                            type="number"
                            value={newProduct.max_rental_days}
                            onChange={(e) => setNewProduct({...newProduct, max_rental_days: Number(e.target.value)})}
                            placeholder="7"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                            placeholder="Enter product description"
                            rows={3}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="tags">Tags (comma separated)</Label>
                          <Input
                            id="tags"
                            value={newProduct.tags.join(', ')}
                            onChange={(e) => setNewProduct({
                              ...newProduct, 
                              tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                            })}
                            placeholder="luxury, designer, evening"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-6">
                        <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateProduct} className="bg-indigo-600 hover:bg-indigo-700">
                          Create Product
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Products Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Product</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Price</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Views</th>
                        <th className="text-left p-4">Bookings</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl">{product.images?.[0] || '📦'}</div>
                              <div>
                                <p className="font-medium text-gray-900">{product.name}</p>
                                <p className="text-sm text-gray-500">{product.owner?.full_name || 'Unknown'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">{product.category}</Badge>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold">${product.price}/day</span>
                          </td>
                          <td className="p-4">
                            <Select
                              value={product.status}
                              onValueChange={(value) => handleStatusChange(product.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="rented">Rented</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4 text-gray-400" />
                              <span>{product.views || 0}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span>{product.bookings || 0}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600">Create your first product to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Dresses', 'Jewelries', 'Others'].map((category, index) => {
                      const count = products.filter(p => p.category === category).length;
                      const percentage = products.length > 0 ? (count / products.length) * 100 : 0;
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <span className="font-medium">{category}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-indigo-500 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{count}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products
                      .sort((a, b) => (b.views || 0) - (a.views || 0))
                      .slice(0, 5)
                      .map((product) => (
                        <div key={product.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="text-xl">{product.images?.[0] || '📦'}</div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.views || 0} views</p>
                          </div>
                          <Badge 
                            className={`${getStatusColor(product.status)} text-white`}
                          >
                            {product.status}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Activity Tracking</h3>
                  <p className="text-gray-600">Real-time activity monitoring coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}