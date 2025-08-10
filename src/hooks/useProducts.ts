"use client";

import { useState, useEffect, useCallback } from "react";
import { Product, Analytics, Booking, Review } from "@/types";
import { StorageManager, STORAGE_KEYS } from "@/lib/storage";

const storage = StorageManager.getInstance();

// Real product data with comprehensive details
const initialProducts: Product[] = [
  {
    id: "prod-1",
    name: "Canon EOS R5 Professional Camera Kit",
    category: "Electronics",
    price: 120,
    status: "active",
    owner: "Sarah Photography Studio",
    ownerId: "owner-1",
    location: "New York, NY",
    rating: 4.9,
    image: "📷",
    images: ["📷", "📸", "🎥"],
    description: "Professional full-frame mirrorless camera with 45MP sensor, 8K video recording, and complete lens kit. Includes 24-70mm f/2.8, 70-200mm f/2.8, tripod, lighting equipment, and carrying case. Perfect for weddings, portraits, events, and commercial photography.",
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-01-20").toISOString(),
    views: 1247,
    bookings: 34,
    tags: ["photography", "professional", "wedding", "portrait", "commercial"],
    availability: {
      startDate: "2024-02-01",
      endDate: "2024-12-31",
      unavailableDates: ["2024-03-15", "2024-03-16", "2024-04-20"]
    },
    featured: true,
    condition: "excellent",
    deposit: 500,
    minRentalDays: 1,
    maxRentalDays: 14,
    deliveryOptions: {
      pickup: true,
      delivery: true,
      deliveryFee: 25,
      deliveryRadius: 50
    },
    specifications: {
      "Sensor": "45MP Full-Frame CMOS",
      "Video": "8K RAW, 4K 120p",
      "ISO Range": "100-51200",
      "Autofocus": "1053 AF points",
      "Weight": "1.62 lbs"
    },
    policies: {
      cancellation: "Free cancellation up to 24 hours before rental",
      damage: "Renter responsible for repair costs beyond normal wear",
      lateFee: 50
    }
  },
  {
    id: "prod-2",
    name: "Professional Power Tools Collection",
    category: "Tools & Equipment",
    price: 85,
    status: "active",
    owner: "Mike's Construction Supply",
    ownerId: "owner-2",
    location: "Los Angeles, CA",
    rating: 4.7,
    image: "🔧",
    images: ["🔧", "🔨", "⚡"],
    description: "Complete professional power tools set including cordless drill, circular saw, angle grinder, reciprocating saw, impact driver, and more. All tools are DeWalt 20V MAX with batteries and chargers. Perfect for construction, renovation, and DIY projects.",
    createdAt: new Date("2024-01-10").toISOString(),
    updatedAt: new Date("2024-01-18").toISOString(),
    views: 892,
    bookings: 28,
    tags: ["construction", "DIY", "renovation", "professional", "cordless"],
    availability: {
      startDate: "2024-02-01",
      endDate: "2024-12-31",
      unavailableDates: ["2024-02-28", "2024-03-01"]
    },
    featured: false,
    condition: "excellent",
    deposit: 300,
    minRentalDays: 1,
    maxRentalDays: 30,
    deliveryOptions: {
      pickup: true,
      delivery: true,
      deliveryFee: 35,
      deliveryRadius: 30
    },
    specifications: {
      "Brand": "DeWalt",
      "Voltage": "20V MAX",
      "Battery Life": "Up to 8 hours",
      "Warranty": "3 years",
      "Case": "Heavy-duty carrying case"
    },
    policies: {
      cancellation: "Free cancellation up to 48 hours before rental",
      damage: "Replacement cost for damaged tools",
      lateFee: 25
    }
  },
  {
    id: "prod-3",
    name: "Luxury Wedding Tent & Decor Package",
    category: "Party & Events",
    price: 350,
    status: "active",
    owner: "Elite Events & Catering",
    ownerId: "owner-3",
    location: "Chicago, IL",
    rating: 4.8,
    status: "active",
    image: "🎪",
    images: ["🎪", "✨", "🌸"],
    description: "Elegant 40x60 luxury tent with crystal chandeliers, premium linens, gold chiavari chairs, and complete table settings for 200 guests. Includes professional setup and breakdown service. Perfect for weddings, corporate galas, and upscale celebrations.",
    createdAt: new Date("2024-01-12").toISOString(),
    updatedAt: new Date("2024-01-19").toISOString(),
    views: 1456,
    bookings: 12,
    tags: ["wedding", "luxury", "corporate", "gala", "elegant"],
    availability: {
      startDate: "2024-02-01",
      endDate: "2024-12-31",
      unavailableDates: ["2024-06-15", "2024-06-16", "2024-07-20", "2024-07-21"]
    },
    featured: true,
    condition: "excellent",
    deposit: 1000,
    minRentalDays: 2,
    maxRentalDays: 5,
    deliveryOptions: {
      pickup: false,
      delivery: true,
      deliveryFee: 150,
      deliveryRadius: 100
    },
    specifications: {
      "Size": "40x60 feet",
      "Capacity": "200 guests",
      "Setup Time": "4-6 hours",
      "Weather": "All-weather resistant",
      "Flooring": "Premium subflooring included"
    },
    policies: {
      cancellation: "50% refund if cancelled 30+ days prior",
      damage: "Full replacement cost for damaged items",
      lateFee: 100
    }
  },
  {
    id: "prod-4",
    name: "Carbon Fiber Mountain Bike - Trek Fuel EX",
    category: "Sports & Outdoor",
    price: 65,
    status: "active",
    owner: "Mountain Adventure Rentals",
    ownerId: "owner-4",
    location: "Denver, CO",
    rating: 4.6,
    image: "🚵",
    images: ["🚵", "🏔️", "⚡"],
    description: "High-performance Trek Fuel EX 9.8 with full suspension, 29-inch wheels, and 12-speed SRAM GX drivetrain. Recently serviced with new tires and brake pads. Includes helmet, repair kit, and trail maps. Perfect for mountain trails and cross-country riding.",
    createdAt: new Date("2024-01-08").toISOString(),
    updatedAt: new Date("2024-01-16").toISOString(),
    views: 634,
    bookings: 19,
    tags: ["mountain", "biking", "adventure", "trails", "carbon"],
    availability: {
      startDate: "2024-02-01",
      endDate: "2024-11-30",
      unavailableDates: ["2024-03-10", "2024-03-11"]
    },
    featured: false,
    condition: "excellent",
    deposit: 200,
    minRentalDays: 1,
    maxRentalDays: 7,
    deliveryOptions: {
      pickup: true,
      delivery: true,
      deliveryFee: 20,
      deliveryRadius: 25
    },
    specifications: {
      "Frame": "Carbon fiber",
      "Suspension": "Full suspension, 130mm travel",
      "Gears": "12-speed SRAM GX",
      "Wheel Size": "29 inches",
      "Weight": "28 lbs"
    },
    policies: {
      cancellation: "Free cancellation up to 24 hours before rental",
      damage: "Renter responsible for repair costs",
      lateFee: 30
    }
  },
  {
    id: "prod-5",
    name: "Professional DJ Equipment & Sound System",
    category: "Electronics",
    price: 180,
    status: "active",
    owner: "SoundWave Pro Audio",
    ownerId: "owner-5",
    location: "Miami, FL",
    rating: 4.9,
    image: "🎵",
    images: ["🎵", "🎧", "🔊"],
    description: "Complete professional DJ setup with Pioneer DDJ-SX3 controller, QSC K12.2 speakers, wireless microphones, LED lighting system, and fog machine. Includes all cables and setup assistance. Perfect for weddings, parties, and corporate events up to 300 people.",
    createdAt: new Date("2024-01-14").toISOString(),
    updatedAt: new Date("2024-01-21").toISOString(),
    views: 1123,
    bookings: 22,
    tags: ["DJ", "music", "wedding", "party", "professional"],
    availability: {
      startDate: "2024-02-01",
      endDate: "2024-12-31",
      unavailableDates: ["2024-02-14", "2024-03-17"]
    },
    featured: true,
    condition: "excellent",
    deposit: 400,
    minRentalDays: 1,
    maxRentalDays: 3,
    deliveryOptions: {
      pickup: true,
      delivery: true,
      deliveryFee: 50,
      deliveryRadius: 40
    },
    specifications: {
      "Controller": "Pioneer DDJ-SX3",
      "Speakers": "QSC K12.2 (pair)",
      "Power": "2000W total",
      "Microphones": "2x wireless handheld",
      "Lighting": "LED wash lights & fog machine"
    },
    policies: {
      cancellation: "Free cancellation up to 48 hours before rental",
      damage: "Replacement cost for damaged equipment",
      lateFee: 75
    }
  },
  {
    id: "prod-6",
    name: "Designer Evening Gown Collection",
    category: "Fashion",
    price: 95,
    status: "active",
    owner: "Glamour Boutique & Rentals",
    ownerId: "owner-6",
    location: "Beverly Hills, CA",
    rating: 4.8,
    image: "👗",
    images: ["👗", "✨", "💎"],
    description: "Exquisite collection of designer evening gowns from top brands including Vera Wang, Oscar de la Renta, and Marchesa. Available in sizes 0-16 with professional alterations included. Perfect for galas, red carpet events, proms, and black-tie occasions.",
    createdAt: new Date("2024-01-11").toISOString(),
    updatedAt: new Date("2024-01-17").toISOString(),
    views: 789,
    bookings: 15,
    tags: ["designer", "formal", "gala", "prom", "luxury"],
    availability: {
      startDate: "2024-02-01",
      endDate: "2024-12-31",
      unavailableDates: ["2024-05-18", "2024-06-22"]
    },
    featured: false,
    condition: "excellent",
    deposit: 300,
    minRentalDays: 2,
    maxRentalDays: 7,
    deliveryOptions: {
      pickup: true,
      delivery: true,
      deliveryFee: 30,
      deliveryRadius: 50
    },
    specifications: {
      "Brands": "Vera Wang, Oscar de la Renta, Marchesa",
      "Sizes": "0-16 available",
      "Alterations": "Professional fitting included",
      "Cleaning": "Professional dry cleaning included",
      "Accessories": "Matching shoes and jewelry available"
    },
    policies: {
      cancellation: "Free cancellation up to 7 days before event",
      damage: "Cleaning fee for stains, replacement cost for damage",
      lateFee: 40
    }
  }
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize data
  useEffect(() => {
    const savedProducts = storage.getItem<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    if (savedProducts.length === 0) {
      setProducts(initialProducts);
      storage.setItem(STORAGE_KEYS.PRODUCTS, initialProducts);
    } else {
      setProducts(savedProducts);
    }

    // Initialize bookings and reviews
    const savedBookings = storage.getItem<Booking[]>('qamrah_bookings', []);
    const savedReviews = storage.getItem<Review[]>('qamrah_reviews', []);
    setBookings(savedBookings);
    setReviews(savedReviews);

    setLoading(false);
  }, []);

  // Save products to storage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      storage.setItem(STORAGE_KEYS.PRODUCTS, products);
    }
  }, [products]);

  const addProduct = useCallback((product: Omit<Product, "id" | "createdAt" | "updatedAt" | "views" | "bookings">) => {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      bookings: 0,
      images: [product.image],
      specifications: product.specifications || {},
      policies: product.policies || {
        cancellation: "Standard cancellation policy",
        damage: "Renter responsible for damages",
        lateFee: 25
      }
    };
    setProducts(prev => [newProduct, ...prev]);
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, ...updates, updatedAt: new Date().toISOString() }
        : product
    ));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  }, []);

  const incrementViews = useCallback((id: string) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, views: product.views + 1 }
        : product
    ));
  }, []);

  const addToFavorites = useCallback((productId: string) => {
    const favorites = storage.getItem<string[]>(STORAGE_KEYS.FAVORITES, []);
    if (!favorites.includes(productId)) {
      const newFavorites = [...favorites, productId];
      storage.setItem(STORAGE_KEYS.FAVORITES, newFavorites);
    }
  }, []);

  const removeFromFavorites = useCallback((productId: string) => {
    const favorites = storage.getItem<string[]>(STORAGE_KEYS.FAVORITES, []);
    const newFavorites = favorites.filter(id => id !== productId);
    storage.setItem(STORAGE_KEYS.FAVORITES, newFavorites);
  }, []);

  const getFavorites = useCallback(() => {
    return storage.getItem<string[]>(STORAGE_KEYS.FAVORITES, []);
  }, []);

  const addRecentView = useCallback((productId: string) => {
    const recentViews = storage.getItem<string[]>(STORAGE_KEYS.RECENT_VIEWS, []);
    const newRecentViews = [productId, ...recentViews.filter(id => id !== productId)].slice(0, 10);
    storage.setItem(STORAGE_KEYS.RECENT_VIEWS, newRecentViews);
  }, []);

  const getAnalytics = useCallback((): Analytics => {
    const activeProducts = products.filter(p => p.status === "active");
    const totalBookings = products.reduce((sum, p) => sum + p.bookings, 0);
    const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.bookings), 0);
    
    const categoryStats = products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = { count: 0, revenue: 0 };
      }
      acc[product.category].count++;
      acc[product.category].revenue += product.price * product.bookings;
      return acc;
    }, {} as Record<string, { count: number; revenue: number }>);

    const topCategories = Object.entries(categoryStats)
      .map(([name, stats]) => ({ name, ...stats }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    const recentActivity = products
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 10)
      .map(product => ({
        id: `activity-${product.id}`,
        type: "product" as const,
        message: `Product "${product.name}" was updated`,
        timestamp: product.updatedAt,
        productId: product.id
      }));

    return {
      totalProducts: products.length,
      activeProducts: activeProducts.length,
      totalUsers: 1250 + Math.floor(Math.random() * 100), // Simulated
      totalBookings,
      totalRevenue,
      monthlyRevenue: Math.floor(totalRevenue * 0.3),
      averageRating: products.reduce((sum, p) => sum + p.rating, 0) / products.length || 0,
      topCategories,
      recentActivity,
      monthlyStats: [], // Would be populated with real data
      popularProducts: products.sort((a, b) => b.views - a.views).slice(0, 5),
      userGrowth: 12.5,
      bookingGrowth: 18.3,
      revenueGrowth: 23.7
    };
  }, [products]);

  return {
    products,
    bookings,
    reviews,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    incrementViews,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    addRecentView,
    getAnalytics
  };
}