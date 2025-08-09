export interface Product {
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
  createdAt: string;
  updatedAt: string;
  views: number;
  bookings: number;
  tags: string[];
  availability: {
    startDate: string;
    endDate: string;
  };
  featured: boolean;
  condition: "excellent" | "good" | "fair";
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "user";
  joinedAt: string;
  totalRentals: number;
  rating: number;
}

export interface Analytics {
  totalProducts: number;
  totalUsers: number;
  totalRevenue: number;
  activeRentals: number;
  monthlyGrowth: number;
  topCategories: { name: string; count: number }[];
  recentActivity: { type: string; message: string; timestamp: string }[];
}

export interface FilterOptions {
  category: string;
  priceRange: [number, number];
  location: string;
  rating: number;
  availability: string;
}