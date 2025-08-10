export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  status: "active" | "inactive" | "pending" | "rented";
  owner: string;
  ownerId: string;
  location: string;
  rating: number;
  image: string;
  images: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  bookings: number;
  tags: string[];
  availability: {
    startDate: string;
    endDate: string;
    unavailableDates: string[];
  };
  featured: boolean;
  condition: "excellent" | "good" | "fair" | "poor";
  deposit: number;
  minRentalDays: number;
  maxRentalDays: number;
  deliveryOptions: {
    pickup: boolean;
    delivery: boolean;
    deliveryFee: number;
    deliveryRadius: number;
  };
  specifications: Record<string, string>;
  policies: {
    cancellation: string;
    damage: string;
    lateFee: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: "admin" | "user" | "owner";
  joinedAt: string;
  totalRentals: number;
  totalEarnings: number;
  rating: number;
  verified: boolean;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    currency: string;
    language: string;
  };
  documents: {
    idVerified: boolean;
    phoneVerified: boolean;
    emailVerified: boolean;
  };
}

export interface Booking {
  id: string;
  productId: string;
  renterId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  deposit: number;
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: string;
  updatedAt: string;
  notes: string;
  deliveryMethod: "pickup" | "delivery";
  deliveryAddress?: string;
}

export interface Review {
  id: string;
  productId: string;
  bookingId: string;
  reviewerId: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
  response?: {
    comment: string;
    createdAt: string;
  };
}

export interface Analytics {
  totalProducts: number;
  activeProducts: number;
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageRating: number;
  topCategories: { name: string; count: number; revenue: number }[];
  recentActivity: { 
    id: string;
    type: "booking" | "product" | "user" | "review";
    message: string;
    timestamp: string;
    userId?: string;
    productId?: string;
  }[];
  monthlyStats: {
    month: string;
    bookings: number;
    revenue: number;
    newUsers: number;
  }[];
  popularProducts: Product[];
  userGrowth: number;
  bookingGrowth: number;
  revenueGrowth: number;
}

export interface FilterOptions {
  category: string;
  priceRange: [number, number];
  location: string;
  rating: number;
  availability: string;
  condition: string;
  deliveryOptions: string[];
  sortBy: "price" | "rating" | "newest" | "popular";
  sortOrder: "asc" | "desc";
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  currency: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  searchHistory: string[];
  recentViews: string[];
  favorites: string[];
}

export interface CartItem {
  productId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  dailyRate: number;
  totalAmount: number;
  deliveryMethod: "pickup" | "delivery";
  addedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: "booking" | "payment" | "review" | "system";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}