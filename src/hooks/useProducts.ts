"use client";

import { useState, useEffect, useCallback } from "react";
import { dataService } from "@/lib/dataService";
import { Product, Order, Review, Analytics } from "@/types";
import { useAuth } from "./useAuth";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch products
  const fetchProducts = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      const allProducts = dataService.getProducts();
      setProducts(allProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
      const newProduct = dataService.addProduct({
        ...productData,
        owner_id: user.id,
        owner: {
          id: user.id,
          full_name: user.full_name,
          avatar_url: user.avatar_url,
          rating: user.rating,
          verified: user.verified,
          email: user.email,
          phone: user.phone
        },
        status: 'available',
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
      });

      setProducts(prev => [newProduct, ...prev]);
      return { success: true, data: newProduct };
    } catch (err) {
      console.error('Error adding product:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to add product' 
      };
    }
  }, [user]);

  // Update product
  const updateProduct = useCallback(async (productId: string, updates: Partial<Product>) => {
    if (!user) {
      return { success: false, error: 'Must be logged in' };
    }

    try {
      const updatedProduct = dataService.updateProduct(productId, updates);
      if (!updatedProduct) {
        return { success: false, error: 'Product not found or not authorized' };
      }

      setProducts(prev => prev.map(p => p.id === productId ? updatedProduct : p));
      return { success: true, data: updatedProduct };
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
      return { success: false, error: 'Must be logged in' };
    }

    try {
      const success = dataService.deleteProduct(productId);
      if (!success) {
        return { success: false, error: 'Product not found' };
      }

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
  const incrementViews = useCallback((productId: string) => {
    dataService.incrementViews(productId);
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, views: p.views + 1 } : p
    ));
  }, []);

  // Favorites management
  const addToFavorites = useCallback(async (productId: string) => {
    if (!user) return { success: false, error: 'Must be logged in' };

    try {
      const success = dataService.addToFavorites(user.id, productId);
      return { success };
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
      const success = dataService.removeFromFavorites(user.id, productId);
      return { success };
    } catch (err) {
      console.error('Error removing from favorites:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to remove from favorites' 
      };
    }
  }, [user]);

  // Get user's favorites
  const getFavorites = useCallback(() => {
    if (!user) return [];
    return dataService.getUserFavorites(user.id);
  }, [user]);

  // Create booking/order
  const createOrder = useCallback(async (orderData: {
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
      throw new Error('Must be logged in to create orders');
    }

    try {
      const product = dataService.getProduct(orderData.product_id);
      if (!product) {
        throw new Error('Product not found');
      }

      const newOrder = dataService.createOrder({
        ...orderData,
        product,
        renter_id: user.id,
        owner_id: product.owner_id,
        status: 'pending',
        payment_status: 'pending',
        notes: orderData.notes || null,
        delivery_address: orderData.delivery_address || null
      });

      // Add notification to owner
      dataService.addNotification({
        user_id: product.owner_id,
        title: 'New Rental Request',
        message: `${user.full_name} wants to rent your ${product.name}`,
        type: 'order',
        read: false
      });

      return { success: true, data: newOrder };
    } catch (err) {
      console.error('Error creating order:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to create order' 
      };
    }
  }, [user]);

  // Get analytics data
  const getAnalytics = useCallback(() => {
    return dataService.getAnalytics();
  }, []);

  // Get user orders
  const getUserOrders = useCallback(() => {
    if (!user) return [];
    return dataService.getUserOrders(user.id);
  }, [user]);

  // Get owner orders
  const getOwnerOrders = useCallback(() => {
    if (!user) return [];
    return dataService.getOwnerOrders(user.id);
  }, [user]);

  // Add review
  const addReview = useCallback(async (reviewData: {
    product_id: string;
    rating: number;
    comment: string;
  }) => {
    if (!user) {
      return { success: false, error: 'Must be logged in' };
    }

    try {
      const newReview = dataService.addReview({
        ...reviewData,
        reviewer_id: user.id,
        reviewer_name: user.full_name
      });

      return { success: true, data: newReview };
    } catch (err) {
      console.error('Error adding review:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to add review' 
      };
    }
  }, [user]);

  // Get product reviews
  const getProductReviews = useCallback((productId: string) => {
    return dataService.getProductReviews(productId);
  }, []);

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
    createOrder,
    getUserOrders,
    getOwnerOrders,
    addReview,
    getProductReviews,
    getAnalytics,
    refreshProducts: fetchProducts
  };
}