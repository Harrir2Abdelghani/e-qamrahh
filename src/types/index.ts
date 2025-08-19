export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  deposit?: number;
  location: string;
  images: string[];
  tags: string[];
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  min_rental_days: number;
  max_rental_days: number;
  delivery_options: {
    pickup: boolean;
    delivery: boolean;
    deliveryFee: number;
    deliveryRadius: number;
  };
  specifications: Record<string, any>;
  policies: {
    cancellation: string;
    damage: string;
    lateFee: number;
  };
  owner_id: string;
  owner: {
    id: string;
    full_name: string;
    avatar_url?: string;
    rating: number;
    verified: boolean;
    email: string;
    phone?: string;
  };
  status: 'available' | 'rented' | 'maintenance' | 'pending';
  views: number;
  rating: number;
  reviews_count: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'user' | 'admin';
  phone?: string;
  location?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
  favorites: string[];
  rental_history: RentalHistory[];
  total_spent: number;
  rating: number;
  verified: boolean;
}

export { User };

export interface Order {
  id: string;
  product_id: string;
  product: Product;
  renter_id: string;
  owner_id: string;
  start_date: string;
  end_date: string;
  total_amount: number;
  deposit: number;
  delivery_method: 'pickup' | 'delivery';
  delivery_address?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'refunded';
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  reviewer_id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Analytics {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  topCategories: Array<{
    name: string;
    count: number;
    revenue: number;
  }>;
  recentActivity: Array<{
    type: 'order' | 'product' | 'user';
    message: string;
    timestamp: string;
  }>;
  monthlyStats: Array<{
    month: string;
    orders: number;
    revenue: number;
  }>;
}

export interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
  location?: string;
  condition?: string;
  sortBy?: 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'rating' | 'views';
  searchQuery?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'order' | 'review' | 'system' | 'promotion';
  read: boolean;
  created_at: string;
}

// Placeholder for RentalHistory interface as it's used in User but not defined in the original snippet
interface RentalHistory {
  // Define properties of RentalHistory here if known
  order_id: string;
  start_date: string;
  end_date: string;
}