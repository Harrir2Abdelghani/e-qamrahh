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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Package,
  Users,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Globe,
  Shield,
  DollarSign,
  TrendingUp,
  Activity,
  Calendar,
  Star,
  Zap,
  LogOut,
  User,
  Lock,
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

interface Analytics {
  totalProducts: number;
  totalUsers: number;
  totalRevenue: number;
  activeRentals: number;
  monthlyGrowth: number;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("qamrah-products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Initialize with default products if none exist
      const defaultProducts = [
        {
          id: "1",
          name: "Professional Camera Kit",
          category: "Electronics",
          price: 150,
          status: "active",
          owner: "John Smith",
          location: "New York, NY",
          rating: 4.8,
          image: "📷",
          description:
            "High-quality camera equipment for events and photography",
        },
        {
          id: "2",
          name: "Power Tools Set",
          category: "Tools & Equipment",
          price: 75,
          status: "active",
          owner: "Mike Johnson",
          location: "Los Angeles, CA",
          rating: 4.6,
          image: "🔧",
          description: "Complete set of professional power tools",
        },
        {
          id: "3",
          name: "Party Tent & Decorations",
          category: "Party & Events",
          price: 200,
          status: "pending",
          owner: "Sarah Wilson",
          location: "Chicago, IL",
          rating: 4.9,
          image: "🎉",
          description: "Large party tent with full decoration package",
        },
        {
          id: "4",
          name: "Mountain Bike",
          category: "Sports & Outdoor",
          price: 45,
          status: "active",
          owner: "Alex Chen",
          location: "Denver, CO",
          rating: 4.7,
          image: "🚴",
          description: "High-quality mountain bike for outdoor adventures",
        },
        {
          id: "5",
          name: "DJ Equipment Package",
          category: "Electronics",
          price: 180,
          status: "active",
          owner: "DJ Mike",
          location: "Miami, FL",
          rating: 4.9,
          image: "🎵",
          description: "Complete DJ setup with speakers and lighting",
        },
        {
          id: "6",
          name: "Garden Tools Collection",
          category: "Tools & Equipment",
          price: 60,
          status: "active",
          owner: "Green Thumb Lisa",
          location: "Portland, OR",
          rating: 4.5,
          image: "🌱",
          description: "Complete garden tool set for landscaping projects",
        },
      ];
      setProducts(defaultProducts);
      localStorage.setItem("qamrah-products", JSON.stringify(defaultProducts));
    }
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("qamrah-products", JSON.stringify(products));
    }
  }, [products]);

  const [analytics] = useState<Analytics>({
    totalProducts: 1250,
    totalUsers: 8500,
    totalRevenue: 125000,
    activeRentals: 342,
    monthlyGrowth: 23.5,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials. Use admin/admin");
    }
  };

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-2xl bg-white">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-black" />
            </div>
            <CardTitle className="text-2xl text-black">Admin Login</CardTitle>
            <CardDescription className="text-slate-400">
              Access Qamrah Admin Dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-300">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="Enter username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="Enter password"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Lock className="w-4 h-4 mr-2" />
                Login
              </Button>
            </form>
            <div className="mt-4 text-center text-xs text-slate-500">
              Use: admin / admin
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-black">Qamrah Admin</h1>
                <p className="text-xs text-slate-400">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500 text-white">
                <Activity className="w-3 h-3 mr-1" />
                Live
              </Badge>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/admin-avatar.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  A
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAuthenticated(false)}
                className="border-slate-600 text-slate-300 hover:bg-red-500 hover:text-white"
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
          <Card className="border-0 shadow-xl bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Total Products
                  </p>
                  <p className="text-2xl font-bold text-black">
                    {products.length}
                  </p>
                </div>
                <Package className="w-8 h-8 text-black" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-black">
                    {analytics.totalUsers.toLocaleString()}
                  </p>
                </div>
                <Users className="w-8 h-8 text-black" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Revenue</p>
                  <p className="text-2xl font-bold text-black">
                    ${analytics.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-black" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">
                    Active Rentals
                  </p>
                  <p className="text-2xl font-bold text-black">
                    {analytics.activeRentals}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-black" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-blue-500"
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-purple-500"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-green-500"
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-orange-500"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-black">
                Product Management
              </h2>
              <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 border-slate-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      Add New Product
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                      Add a new product to the Qamrah marketplace
                    </DialogDescription>
                  </DialogHeader>
                  <AddProductForm onSubmit={addProduct} />
                </DialogContent>
              </Dialog>
            </div>

            <Card className="border-0 shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-black">All Products</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage all products in the marketplace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search products..."
                    className="bg-slate-800 border-slate-600 text-white max-w-sm"
                  />
                  <Select>
                    <SelectTrigger className="w-32 bg-slate-800 border-slate-600">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Product</TableHead>
                      <TableHead className="text-slate-300">Category</TableHead>
                      <TableHead className="text-slate-300">Price</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Owner</TableHead>
                      <TableHead className="text-slate-300">Rating</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id} className="border-slate-700">
                        <TableCell className="text-black">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{product.image}</div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-slate-400">
                                {product.location}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {product.category}
                        </TableCell>
                        <TableCell className="text-black">
                          ${product.price}/day
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {product.owner}
                        </TableCell>
                        <TableCell className="text-black">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{product.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-600 text-slate-300"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingProduct(product)}
                              className="border-slate-600 text-slate-300"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteProduct(product.id)}
                              className="border-red-600 text-red-400 hover:bg-red-500 hover:text-white"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-black">Analytics Overview</CardTitle>
                <CardDescription className="text-slate-400">
                  Key metrics and performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-black">
                      Growth Metrics
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                        <span className="text-slate-300">Monthly Growth</span>
                        <span className="text-green-400 font-semibold">
                          +{analytics.monthlyGrowth}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                        <span className="text-slate-300">Active Rentals</span>
                        <span className="text-blue-400 font-semibold">
                          {analytics.activeRentals}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-black">
                      Revenue Breakdown
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                        <span className="text-slate-300">Total Revenue</span>
                        <span className="text-green-400 font-semibold">
                          ${analytics.totalRevenue.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                        <span className="text-slate-300">
                          Average per Rental
                        </span>
                        <span className="text-purple-400 font-semibold">
                          $
                          {Math.round(
                            analytics.totalRevenue / analytics.activeRentals
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-black">User Management</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage user accounts and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-black mb-2">
                    User Management
                  </h3>
                  <p className="text-slate-400">
                    User management features coming soon...
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-black">System Settings</CardTitle>
                <CardDescription className="text-slate-400">
                  Configure system preferences and security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-black">
                      General Settings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300">Site Name</Label>
                        <Input
                          defaultValue="Qamrah"
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">Admin Email</Label>
                        <Input
                          defaultValue="admin@qamrah.com"
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-black">
                      Security
                    </h3>
                    <div className="space-y-4">
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        <Shield className="w-4 h-4 mr-2" />
                        Update Security Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <Dialog
          open={!!editingProduct}
          onOpenChange={() => setEditingProduct(null)}
        >
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Product</DialogTitle>
              <DialogDescription className="text-slate-400">
                Update product information
              </DialogDescription>
            </DialogHeader>
            <EditProductForm
              product={editingProduct}
              onSubmit={updateProduct}
              onCancel={() => setEditingProduct(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function AddProductForm({
  onSubmit,
}: {
  onSubmit: (product: Omit<Product, "id">) => void;
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Product Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-slate-800 border-slate-600 text-white"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Tools & Equipment">
                Tools & Equipment
              </SelectItem>
              <SelectItem value="Sports & Outdoor">Sports & Outdoor</SelectItem>
              <SelectItem value="Party & Events">Party & Events</SelectItem>
              <SelectItem value="Dress">Dress</SelectItem>
              <SelectItem value="Clothes">Clothes</SelectItem>
              <SelectItem value="Jewelleries">Jewelleries</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Price per Day ($)</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="bg-slate-800 border-slate-600 text-white"
            placeholder="0.00"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Owner</Label>
          <Input
            value={formData.owner}
            onChange={(e) =>
              setFormData({ ...formData, owner: e.target.value })
            }
            className="bg-slate-800 border-slate-600 text-white"
            placeholder="Owner name"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-slate-300">Location</Label>
        <Input
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="bg-slate-800 border-slate-600 text-white"
          placeholder="City, State"
          required
        />
      </div>
      <div className="space-y-2">
        <Label className="text-slate-300">Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="bg-slate-800 border-slate-600 text-white"
          placeholder="Product description..."
          rows={3}
          required
        />
      </div>
      <DialogFooter>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </DialogFooter>
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Product Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-slate-800 border-slate-600 text-white"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Tools & Equipment">
                Tools & Equipment
              </SelectItem>
              <SelectItem value="Sports & Outdoor">Sports & Outdoor</SelectItem>
              <SelectItem value="Party & Events">Party & Events</SelectItem>
              <SelectItem value="Dress">Dress</SelectItem>
              <SelectItem value="Clothes">Clothes</SelectItem>
              <SelectItem value="Jewelleries">Jewelleries</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Price per Day ($)</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="bg-slate-800 border-slate-600 text-white"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value as any })
            }
          >
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Owner</Label>
          <Input
            value={formData.owner}
            onChange={(e) =>
              setFormData({ ...formData, owner: e.target.value })
            }
            className="bg-slate-800 border-slate-600 text-white"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Location</Label>
          <Input
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="bg-slate-800 border-slate-600 text-white"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-slate-300">Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="bg-slate-800 border-slate-600 text-white"
          rows={3}
          required
        />
      </div>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-slate-600 text-slate-300"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Edit className="w-4 h-4 mr-2" />
          Update Product
        </Button>
      </DialogFooter>
    </form>
  );
}
