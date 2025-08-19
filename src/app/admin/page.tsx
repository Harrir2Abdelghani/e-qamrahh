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
import { Product } from "@/types";
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
  XCircle
} from "lucide-react";

interface Analytics {
  totalProducts: number;
  activeProducts: number;
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageRating: number;
  topCategories: Array<{ name: string; count: number }>;
  recentActivity: Array<{ id: string; action: string; item: string; user: string; time: string }>;
  monthlyStats: Array<{ month: string; bookings: number; revenue: number }>;
  popularProducts: Product[];
  userGrowth: number;
  bookingGrowth: number;
  revenueGrowth: number;
}

export default function AdminDashboard() {
  const { user, isAuthenticated, login } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    category: '',
    price: 0,
    deposit: 0,
    status: 'active',
    location: '',
    condition: 'excellent',
    minRentalDays: 1,
    maxRentalDays: 7,
    image: '📦'
  });

  // Load data on component mount
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      return;
    }
    loadData();
  }, [isAuthenticated, user]);

  const loadData = () => {
    // Simulate loading real data
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Elegant Evening Gown',
        description: 'Stunning black evening gown perfect for formal events.',
        category: 'Dresses',
        price: 85,
        deposit: 200,
        status: 'active',
        owner: 'Sarah Chen',
        ownerId: 'owner1',
        location: 'San Francisco, CA',
        rating: 4.9,
        image: '👗',
        images: ['👗', '✨', '🌟'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 1234,
        bookings: 89,
        tags: ['evening', 'formal', 'elegant'],
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
          deliveryFee: 15,
          deliveryRadius: 25
        },
        specifications: {
          'Size': 'M (adjustable)',
          'Color': 'Black',
          'Material': 'Silk and Chiffon'
        },
        policies: {
          cancellation: 'Free cancellation up to 24 hours',
          damage: 'Professional cleaning included',
          lateFee: 50
        }
      },
      {
        id: '2',
        name: 'Diamond Tennis Bracelet',
        description: 'Exquisite diamond bracelet with genuine diamonds.',
        category: 'Jewelries',
        price: 120,
        deposit: 800,
        status: 'active',
        owner: 'Alex Rodriguez',
        ownerId: 'owner2',
        location: 'New York, NY',
        rating: 4.8,
        image: '💎',
        images: ['💎', '✨', '💍'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 892,
        bookings: 45,
        tags: ['diamond', 'luxury', 'bracelet'],
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
          deliveryFee: 25,
          deliveryRadius: 30
        },
        specifications: {
          'Material': '18K White Gold',
          'Diamonds': '2.5 Carat Total Weight',
          'Length': '7 inches'
        },
        policies: {
          cancellation: 'Free cancellation up to 48 hours',
          damage: 'Full insurance coverage',
          lateFee: 75
        }
      },
      {
        id: '3',
        name: 'Professional Camera Equipment',
        description: 'Complete photography setup with DSLR camera and lenses.',
        category: 'Others',
        price: 65,
        deposit: 300,
        status: 'active',
        owner: 'David Wilson',
        ownerId: 'owner3',
        location: 'Chicago, IL',
        rating: 4.7,
        image: '📷',
        images: ['📷', '📸', '🎥'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 567,
        bookings: 23,
        tags: ['camera', 'photography', 'professional'],
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
          deliveryFee: 15,
          deliveryRadius: 20
        },
        specifications: {
          'Camera': 'Canon EOS R5',
          'Lenses': '24-70mm + 50mm',
          'Accessories': 'Tripod, Flash, Memory Cards'
        },
        policies: {
          cancellation: 'Free cancellation up to 24 hours',
          damage: 'Equipment insurance included',
          lateFee: 40
        }
      }
    ];

    const analyticsData: Analytics = {
      totalProducts: 156,
      activeProducts: 142,
      totalUsers: 1247,
      totalBookings: 892,
      totalRevenue: 125630,
      monthlyRevenue: 28450,
      averageRating: 4.8,
      topCategories: [
        { name: 'Dresses', count: 67 },
        { name: 'Jewelries', count: 54 },
        { name: 'Others', count: 35 }
      ],
      recentActivity: [
        { id: '1', action: 'New booking', item: 'Evening Gown', user: 'Emma Stone', time: '2 min ago' },
        { id: '2', action: 'Product added', item: 'Pearl Necklace', user: 'John Doe', time: '15 min ago' },
        { id: '3', action: 'Booking completed', item: 'Camera Kit', user: 'Sarah Wilson', time: '1 hour ago' },
        { id: '4', action: 'New user registered', item: '', user: 'Mike Johnson', time: '2 hours ago' }
      ],
      monthlyStats: [
        { month: 'Jan', bookings: 234, revenue: 15240 },
        { month: 'Feb', bookings: 287, revenue: 18650 },
        { month: 'Mar', bookings: 312, revenue: 21340 },
        { month: 'Apr', bookings: 298, revenue: 19870 }
      ],
      popularProducts: sampleProducts,
      userGrowth: 12.5,
      bookingGrowth: 18.3,
      revenueGrowth: 23.7
    };

    setProducts(sampleProducts);
    setAnalytics(analyticsData);
    setLoading(false);
  };

  const handleCreateProduct = () => {
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name || '',
      description: newProduct.description || '',
      category: newProduct.category || 'Others',
      price: newProduct.price || 0,
      deposit: newProduct.deposit || 0,
      status: 'active',
      owner: 'Admin',
      ownerId: 'admin',
      location: newProduct.location || '',
      rating: 5.0,
      image: newProduct.image || '📦',
      images: [newProduct.image || '📦'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      bookings: 0,
      tags: [],
      availability: {
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        unavailableDates: []
      },
      featured: false,
      condition: newProduct.condition || 'excellent',
      minRentalDays: newProduct.minRentalDays || 1,
      maxRentalDays: newProduct.maxRentalDays || 7,
      deliveryOptions: {
        pickup: true,
        delivery: true,
        deliveryFee: 15,
        deliveryRadius: 25
      },
      specifications: {},
      policies: {
        cancellation: 'Free cancellation up to 24 hours',
        damage: 'Standard damage policy',
        lateFee: 25
      }
    };

    setProducts([...products, product]);
    setNewProduct({
      name: '',
      description: '',
      category: '',
      price: 0,
      deposit: 0,
      status: 'active',
      location: '',
      condition: 'excellent',
      minRentalDays: 1,
      maxRentalDays: 7,
      image: '📦'
    });
    setIsCreateModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleStatusChange = (id: string, status: Product['status']) => {
    setProducts(products.map(p => p.id === id ? { ...p, status } : p));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.owner.toLowerCase().includes(searchQuery.toLowerCase())
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

  if (loading) {
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
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Products',
              value: analytics?.totalProducts.toLocaleString(),
              change: '+12.5%',
              icon: Package,
              color: 'from-blue-500 to-blue-600',
              positive: true
            },
            {
              title: 'Active Users',
              value: analytics?.totalUsers.toLocaleString(),
              change: `+${analytics?.userGrowth}%`,
              icon: Users,
              color: 'from-emerald-500 to-emerald-600',
              positive: true
            },
            {
              title: 'Total Bookings',
              value: analytics?.totalBookings.toLocaleString(),
              change: `+${analytics?.bookingGrowth}%`,
              icon: TrendingUp,
              color: 'from-purple-500 to-purple-600',
              positive: true
            },
            {
              title: 'Monthly Revenue',
              value: `$${(analytics?.monthlyRevenue || 0).toLocaleString()}`,
              change: `+${analytics?.revenueGrowth}%`,
              icon: DollarSign,
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
                      {stat.positive ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.positive ? 'text-emerald-600' : 'text-red-600'
                      }`}>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
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
                    <DialogContent className="max-w-2xl">
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
                            onChange={(e) => setNewProduct({...newProduct, price: parseInt(e.target.value)})}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="deposit">Security Deposit ($)</Label>
                          <Input
                            id="deposit"
                            type="number"
                            value={newProduct.deposit}
                            onChange={(e) => setNewProduct({...newProduct, deposit: parseInt(e.target.value)})}
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
                          <Label htmlFor="image">Emoji Icon</Label>
                          <Input
                            id="image"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                            placeholder="📦"
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
                              <div className="text-2xl">{product.image}</div>
                              <div>
                                <p className="font-medium text-gray-900">{product.name}</p>
                                <p className="text-sm text-gray-500">{product.owner}</p>
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
                              onValueChange={(value: Product['status']) => handleStatusChange(product.id, value)}
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
                              <span>{product.views}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span>{product.bookings}</span>
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
                    {analytics?.topCategories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium">{category.name}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-indigo-500 rounded-full" 
                              style={{ width: `${(category.count / (analytics?.totalProducts || 1)) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{category.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics?.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Activity className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.action} {activity.item && `- ${activity.item}`}
                          </p>
                          <p className="text-xs text-gray-500">by {activity.user}</p>
                        </div>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
                  <p className="text-gray-600">User management features coming soon.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>System Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Activity className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600">
                            {activity.item && `${activity.item} - `}by {activity.user}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}