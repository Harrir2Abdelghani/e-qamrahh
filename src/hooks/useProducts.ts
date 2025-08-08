"use client";

import { useState, useEffect, useCallback } from "react";
import { Product } from "@/types";

const STORAGE_KEY = "qamrah-products";

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Professional DSLR Camera Kit",
    category: "Electronics",
    price: 85,
    status: "active",
    owner: "Sarah Photography",
    location: "New York, NY",
    rating: 4.9,
    image: "📷",
    description: "Complete professional photography setup with multiple lenses, tripod, and lighting equipment. Perfect for events, portraits, and commercial shoots.",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    views: 245,
    bookings: 18,
    tags: ["photography", "professional", "events"],
    availability: { startDate: "2024-02-01", endDate: "2024-12-31" }
  },
  {
    id: "2",
    name: "Premium Power Tools Collection",
    category: "Tools & Equipment",
    price: 65,
    status: "active",
    owner: "Mike's Workshop",
    location: "Los Angeles, CA",
    rating: 4.7,
    image: "🔧",
    description: "Professional-grade power tools including drill, saw, grinder, and more. All tools are well-maintained and come with safety equipment.",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    views: 189,
    bookings: 22,
    tags: ["construction", "DIY", "professional"],
    availability: { startDate: "2024-02-01", endDate: "2024-12-31" }
  },
  {
    id: "3",
    name: "Luxury Party Tent & Decor Package",
    category: "Party & Events",
    price: 150,
    status: "active",
    owner: "Elite Events Co.",
    location: "Chicago, IL",
    rating: 4.8,
    image: "🎪",
    description: "Elegant 20x30 tent with premium decorations, lighting, and furniture. Perfect for weddings, corporate events, and celebrations.",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-19",
    views: 312,
    bookings: 8,
    tags: ["wedding", "corporate", "luxury"],
    availability: { startDate: "2024-02-01", endDate: "2024-12-31" }
  },
  {
    id: "4",
    name: "High-End Mountain Bike",
    category: "Sports & Outdoor",
    price: 45,
    status: "active",
    owner: "Adventure Gear Pro",
    location: "Denver, CO",
    rating: 4.6,
    image: "🚵",
    description: "Carbon fiber mountain bike with premium suspension and gear system. Ideal for trail riding and mountain adventures.",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-16",
    views: 156,
    bookings: 15,
    tags: ["outdoor", "adventure", "fitness"],
    availability: { startDate: "2024-02-01", endDate: "2024-12-31" }
  },
  {
    id: "5",
    name: "Professional DJ Equipment Suite",
    category: "Electronics",
    price: 120,
    status: "active",
    owner: "SoundWave Studios",
    location: "Miami, FL",
    rating: 4.9,
    image: "🎵",
    description: "Complete DJ setup with mixing console, speakers, microphones, and lighting. Perfect for parties, weddings, and events.",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-21",
    views: 278,
    bookings: 12,
    tags: ["music", "events", "professional"],
    availability: { startDate: "2024-02-01", endDate: "2024-12-31" }
  },
  {
    id: "6",
    name: "Designer Evening Gown Collection",
    category: "Fashion",
    price: 75,
    status: "active",
    owner: "Glamour Boutique",
    location: "Beverly Hills, CA",
    rating: 4.8,
    image: "👗",
    description: "Stunning collection of designer evening gowns in various sizes. Perfect for galas, proms, and special occasions.",
    createdAt: "2024-01-11",
    updatedAt: "2024-01-17",
    views: 203,
    bookings: 9,
    tags: ["fashion", "formal", "designer"],
    availability: { startDate: "2024-02-01", endDate: "2024-12-31" }
  }
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedProducts = localStorage.getItem(STORAGE_KEY);
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products]);

  const addProduct = useCallback((product: Omit<Product, "id" | "createdAt" | "updatedAt" | "views" | "bookings">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      bookings: 0,
    };
    setProducts(prev => [...prev, newProduct]);
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

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    incrementViews,
  };
}