
import { StorageManager, STORAGE_KEYS } from './storage';
import { Product, User, Order, Review, Analytics, Notification } from '@/types';

export class DataService {
  private static instance: DataService;
  private storage = StorageManager.getInstance();

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  // Initialize with sample data
  initializeSampleData() {
    if (!this.getProducts().length) {
      this.initializeProducts();
    }
    if (!this.getUsers().find(u => u.role === 'admin')) {
      this.initializeUsers();
    }
  }

  private initializeProducts() {
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Professional DSLR Camera',
        description: 'Canon EOS R5 with 24-70mm lens. Perfect for professional photography and videography.',
        category: 'Electronics',
        price: 45,
        deposit: 200,
        location: 'Downtown',
        images: ['https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500'],
        tags: ['camera', 'photography', 'professional'],
        condition: 'excellent',
        min_rental_days: 1,
        max_rental_days: 14,
        delivery_options: {
          pickup: true,
          delivery: true,
          deliveryFee: 15,
          deliveryRadius: 10
        },
        specifications: {
          brand: 'Canon',
          model: 'EOS R5',
          megapixels: '45MP',
          lens: '24-70mm f/2.8'
        },
        policies: {
          cancellation: 'Free cancellation up to 24 hours before rental',
          damage: 'Renter responsible for damages beyond normal wear',
          lateFee: 25
        },
        owner_id: 'owner1',
        owner: {
          id: 'owner1',
          full_name: 'John Smith',
          avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          rating: 4.8,
          verified: true,
          email: 'john@example.com',
          phone: '+1234567890'
        },
        status: 'available',
        views: 156,
        rating: 4.7,
        reviews_count: 23,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'MacBook Pro 16"',
        description: 'Latest MacBook Pro with M2 Max chip. Perfect for video editing and development work.',
        category: 'Electronics',
        price: 35,
        deposit: 500,
        location: 'Uptown',
        images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500'],
        tags: ['laptop', 'apple', 'development'],
        condition: 'excellent',
        min_rental_days: 1,
        max_rental_days: 30,
        delivery_options: {
          pickup: true,
          delivery: false,
          deliveryFee: 0,
          deliveryRadius: 0
        },
        specifications: {
          brand: 'Apple',
          model: 'MacBook Pro 16"',
          processor: 'M2 Max',
          ram: '32GB',
          storage: '1TB SSD'
        },
        policies: {
          cancellation: 'Free cancellation up to 48 hours before rental',
          damage: 'Full replacement cost for liquid damage',
          lateFee: 50
        },
        owner_id: 'owner2',
        owner: {
          id: 'owner2',
          full_name: 'Sarah Johnson',
          avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100',
          rating: 4.9,
          verified: true,
          email: 'sarah@example.com',
          phone: '+1234567891'
        },
        status: 'available',
        views: 234,
        rating: 4.9,
        reviews_count: 41,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    this.storage.setItem(STORAGE_KEYS.PRODUCTS, sampleProducts);
  }

  private initializeUsers() {
    const sampleUsers: User[] = [
      {
        id: 'admin1',
        email: 'admin@qamrah.com',
        full_name: 'Admin User',
        role: 'admin',
        rating: 5.0,
        verified: true,
        created_at: new Date().toISOString(),
        favorites: []
      },
      {
        id: 'user1',
        email: 'user@example.com',
        full_name: 'Demo User',
        role: 'user',
        rating: 4.5,
        verified: false,
        created_at: new Date().toISOString(),
        favorites: ['1']
      }
    ];

    this.storage.setItem(STORAGE_KEYS.USERS, sampleUsers);
  }

  // Products
  getProducts(): Product[] {
    return this.storage.getItem(STORAGE_KEYS.PRODUCTS, []);
  }

  getProduct(id: string): Product | null {
    const products = this.getProducts();
    return products.find(p => p.id === id) || null;
  }

  addProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'views' | 'rating' | 'reviews_count'>): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      views: 0,
      rating: 0,
      reviews_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    products.unshift(newProduct);
    this.storage.setItem(STORAGE_KEYS.PRODUCTS, products);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    products[index] = {
      ...products[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    this.storage.setItem(STORAGE_KEYS.PRODUCTS, products);
    return products[index];
  }

  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    
    if (filtered.length === products.length) return false;
    
    this.storage.setItem(STORAGE_KEYS.PRODUCTS, filtered);
    return true;
  }

  incrementViews(productId: string): void {
    const product = this.getProduct(productId);
    if (product) {
      this.updateProduct(productId, { views: product.views + 1 });
    }
  }

  // Users
  getUsers(): User[] {
    return this.storage.getItem(STORAGE_KEYS.USERS, []);
  }

  getUser(id: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  getUserByEmail(email: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.email === email) || null;
  }

  createUser(userData: Omit<User, 'id' | 'created_at' | 'favorites'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      favorites: []
    };
    
    users.push(newUser);
    this.storage.setItem(STORAGE_KEYS.USERS, users);
    return newUser;
  }

  updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) return null;
    
    users[index] = { ...users[index], ...updates };
    this.storage.setItem(STORAGE_KEYS.USERS, users);
    return users[index];
  }

  // Favorites
  addToFavorites(userId: string, productId: string): boolean {
    const user = this.getUser(userId);
    if (!user || user.favorites.includes(productId)) return false;
    
    user.favorites.push(productId);
    this.updateUser(userId, { favorites: user.favorites });
    return true;
  }

  removeFromFavorites(userId: string, productId: string): boolean {
    const user = this.getUser(userId);
    if (!user) return false;
    
    user.favorites = user.favorites.filter(id => id !== productId);
    this.updateUser(userId, { favorites: user.favorites });
    return true;
  }

  getUserFavorites(userId: string): Product[] {
    const user = this.getUser(userId);
    if (!user) return [];
    
    const products = this.getProducts();
    return products.filter(p => user.favorites.includes(p.id));
  }

  // Orders
  getOrders(): Order[] {
    return this.storage.getItem(STORAGE_KEYS.ORDERS, []);
  }

  getUserOrders(userId: string): Order[] {
    const orders = this.getOrders();
    return orders.filter(o => o.renter_id === userId);
  }

  getOwnerOrders(ownerId: string): Order[] {
    const orders = this.getOrders();
    return orders.filter(o => o.owner_id === ownerId);
  }

  createOrder(orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Order {
    const orders = this.getOrders();
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    orders.unshift(newOrder);
    this.storage.setItem(STORAGE_KEYS.ORDERS, orders);
    return newOrder;
  }

  updateOrder(id: string, updates: Partial<Order>): Order | null {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === id);
    
    if (index === -1) return null;
    
    orders[index] = {
      ...orders[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    this.storage.setItem(STORAGE_KEYS.ORDERS, orders);
    return orders[index];
  }

  // Reviews
  getReviews(): Review[] {
    return this.storage.getItem(STORAGE_KEYS.REVIEWS, []);
  }

  getProductReviews(productId: string): Review[] {
    const reviews = this.getReviews();
    return reviews.filter(r => r.product_id === productId);
  }

  addReview(reviewData: Omit<Review, 'id' | 'created_at'>): Review {
    const reviews = this.getReviews();
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    
    reviews.unshift(newReview);
    this.storage.setItem(STORAGE_KEYS.REVIEWS, reviews);
    
    // Update product rating
    this.updateProductRating(reviewData.product_id);
    
    return newReview;
  }

  private updateProductRating(productId: string): void {
    const reviews = this.getProductReviews(productId);
    const product = this.getProduct(productId);
    
    if (product && reviews.length > 0) {
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      this.updateProduct(productId, {
        rating: Math.round(avgRating * 10) / 10,
        reviews_count: reviews.length
      });
    }
  }

  // Analytics
  getAnalytics(): Analytics {
    const products = this.getProducts();
    const users = this.getUsers();
    const orders = this.getOrders();

    const totalRevenue = orders
      .filter(o => o.payment_status === 'paid')
      .reduce((sum, o) => sum + o.total_amount, 0);

    const categoryStats = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCategories = Object.entries(categoryStats)
      .map(([name, count]) => ({ name, count, revenue: 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const recentActivity = [
      ...orders.slice(0, 5).map(o => ({
        type: 'order' as const,
        message: `New order for ${o.product.name}`,
        timestamp: o.created_at
      })),
      ...products.slice(0, 3).map(p => ({
        type: 'product' as const,
        message: `New product: ${p.name}`,
        timestamp: p.created_at
      }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return {
      totalProducts: products.length,
      totalUsers: users.filter(u => u.role === 'user').length,
      totalOrders: orders.length,
      totalRevenue,
      topCategories,
      recentActivity,
      monthlyStats: []
    };
  }

  // Notifications
  getNotifications(userId: string): Notification[] {
    const notifications = this.storage.getItem(STORAGE_KEYS.NOTIFICATIONS, []);
    return notifications.filter(n => n.user_id === userId);
  }

  addNotification(notificationData: Omit<Notification, 'id' | 'created_at'>): Notification {
    const notifications = this.storage.getItem(STORAGE_KEYS.NOTIFICATIONS, []);
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    
    notifications.unshift(newNotification);
    this.storage.setItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
    return newNotification;
  }

  markNotificationAsRead(id: string): boolean {
    const notifications = this.storage.getItem(STORAGE_KEYS.NOTIFICATIONS, []);
    const index = notifications.findIndex(n => n.id === id);
    
    if (index === -1) return false;
    
    notifications[index].read = true;
    this.storage.setItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
    return true;
  }
}

export const dataService = DataService.getInstance();
