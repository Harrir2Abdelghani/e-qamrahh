"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database";
import { useAuth } from "./useAuth";

type Product = Database['public']['Tables']['products']['Row'] & {
  owner?: Database['public']['Tables']['profiles']['Row'];
  reviews?: Database['public']['Tables']['reviews']['Row'][];
};

type Booking = Database['public']['Tables']['bookings']['Row'];
type Review = Database['public']['Tables']['reviews']['Row'];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch products with owner information
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          owner:profiles!products_owner_id_fkey(
            id,
            full_name,
            avatar_url,
            rating,
            verified
          ),
          reviews(
            id,
            rating,
            comment,
            created_at,
            reviewer_id
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new product
  const addProduct = useCallback(async (productData: {
    name: string;
    description: string;
    category: string;
    price: number;
    deposit?: number;
    location: string;
    images?: string[];
    tags?: string[];
    condition?: 'excellent' | 'good' | 'fair' | 'poor';
    min_rental_days?: number;
    max_rental_days?: number;
    delivery_options?: any;
    specifications?: any;
    policies?: any;
  }) => {
    if (!user) {
      throw new Error('Must be logged in to add products');
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          ...productData,
          owner_id: user.id,
          status: 'pending',
          deposit: productData.deposit || 0,
          images: productData.images || [],
          tags: productData.tags || [],
          condition: productData.condition || 'good',
          min_rental_days: productData.min_rental_days || 1,
          max_rental_days: productData.max_rental_days || 30,
          delivery_options: productData.delivery_options || {
            pickup: true,
            delivery: false,
            deliveryFee: 0,
            deliveryRadius: 0
          },
          specifications: productData.specifications || {},
          policies: productData.policies || {
            cancellation: "Standard cancellation policy",
            damage: "Renter responsible for damages",
            lateFee: 25
          }
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Refresh products list
      await fetchProducts();
      return { success: true, data };
    } catch (err) {
      console.error('Error adding product:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to add product' 
      };
    }
  }, [user, fetchProducts]);

  // Update product
  const updateProduct = useCallback(async (productId: string, updates: Partial<Product>) => {
    if (!user) {
      throw new Error('Must be logged in to update products');
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId)
        .eq('owner_id', user.id) // Ensure user owns the product
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Update local state
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...data } : p));
      return { success: true, data };
    } catch (err) {
      console.error('Error updating product:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to update product' 
      };
    }
  }, [user]);

  // Delete product
  const deleteProduct = useCallback(async (productId: string) => {
    if (!user) {
      throw new Error('Must be logged in to delete products');
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)
        .eq('owner_id', user.id); // Ensure user owns the product

      if (error) {
        throw error;
      }

      // Update local state
      setProducts(prev => prev.filter(p => p.id !== productId));
      return { success: true };
    } catch (err) {
      console.error('Error deleting product:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to delete product' 
      };
    }
  }, [user]);

  // Increment product views
  const incrementViews = useCallback(async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ 
          views: supabase.sql`views + 1` 
        })
        .eq('id', productId);

      if (error) {
        console.error('Error incrementing views:', error);
      }
    } catch (err) {
      console.error('Error incrementing views:', err);
    }
  }, []);

  // Favorites management
  const addToFavorites = useCallback(async (productId: string) => {
    if (!user) return { success: false, error: 'Must be logged in' };

    try {
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          product_id: productId
        });

      if (error && error.code !== '23505') { // Ignore duplicate key error
        throw error;
      }

      return { success: true };
    } catch (err) {
      console.error('Error adding to favorites:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to add to favorites' 
      };
    }
  }, [user]);

  const removeFromFavorites = useCallback(async (productId: string) => {
    if (!user) return { success: false, error: 'Must be logged in' };

    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (err) {
      console.error('Error removing from favorites:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to remove from favorites' 
      };
    }
  }, [user]);

  // Get user's favorites
  const getFavorites = useCallback(async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('product_id')
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      return data.map(f => f.product_id);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      return [];
    }
  }, [user]);

  // Create booking
  const createBooking = useCallback(async (bookingData: {
    product_id: string;
    start_date: string;
    end_date: string;
    total_amount: number;
    deposit: number;
    delivery_method: 'pickup' | 'delivery';
    delivery_address?: string;
    notes?: string;
  }) => {
    if (!user) {
      throw new Error('Must be logged in to create bookings');
    }

    try {
      // Get product owner
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('owner_id')
        .eq('id', bookingData.product_id)
        .single();

      if (productError || !product) {
        throw new Error('Product not found');
      }

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          ...bookingData,
          renter_id: user.id,
          owner_id: product.owner_id,
          notes: bookingData.notes || null,
          delivery_address: bookingData.delivery_address || null
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (err) {
      console.error('Error creating booking:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to create booking' 
      };
    }
  }, [user]);

  // Get analytics data
  const getAnalytics = useCallback(async () => {
    try {
      // Get basic counts
      const [productsCount, usersCount, bookingsCount] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('*', { count: 'exact', head: true })
      ]);

      // Get revenue data
      const { data: revenueData } = await supabase
        .from('bookings')
        .select('total_amount')
        .eq('payment_status', 'paid');

      const totalRevenue = revenueData?.reduce((sum, booking) => sum + Number(booking.total_amount), 0) || 0;

      // Get category stats
      const { data: categoryData } = await supabase
        .from('products')
        .select('category');

      const categoryStats = categoryData?.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const topCategories = Object.entries(categoryStats)
        .map(([name, count]) => ({ name, count, revenue: 0 }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      return {
        totalProducts: productsCount.count || 0,
        activeProducts: products.filter(p => p.status === 'active').length,
        totalUsers: usersCount.count || 0,
        totalBookings: bookingsCount.count || 0,
        totalRevenue,
        monthlyRevenue: Math.floor(totalRevenue * 0.3),
        averageRating: products.reduce((sum, p) => sum + p.rating, 0) / products.length || 0,
        topCategories,
        recentActivity: [],
        monthlyStats: [],
        popularProducts: products.sort((a, b) => b.views - a.views).slice(0, 5),
        userGrowth: 12.5,
        bookingGrowth: 18.3,
        revenueGrowth: 23.7
      };
    } catch (err) {
      console.error('Error fetching analytics:', err);
      return {
        totalProducts: 0,
        activeProducts: 0,
        totalUsers: 0,
        totalBookings: 0,
        totalRevenue: 0,
        monthlyRevenue: 0,
        averageRating: 0,
        topCategories: [],
        recentActivity: [],
        monthlyStats: [],
        popularProducts: [],
        userGrowth: 0,
        bookingGrowth: 0,
        revenueGrowth: 0
      };
    }
  }, [products]);

  // Initialize data
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Set up real-time subscriptions
  useEffect(() => {
    const channel = supabase
      .channel('products-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'products' }, 
        () => {
          fetchProducts(); // Refresh products on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    incrementViews,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    createBooking,
    getAnalytics,
    refreshProducts: fetchProducts
  };
}