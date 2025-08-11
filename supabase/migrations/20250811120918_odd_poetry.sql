/*
  # Initial Qamrah Database Schema

  1. New Tables
    - `profiles` - User profiles with extended information
    - `products` - Rental products with comprehensive details
    - `bookings` - Rental bookings and transactions
    - `reviews` - Product reviews and ratings
    - `notifications` - User notifications system
    - `favorites` - User favorite products

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure data access based on user roles

  3. Functions
    - Automatic profile creation on signup
    - Update product ratings on new reviews
    - Generate notifications for bookings
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user', 'owner')),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  total_rentals INTEGER DEFAULT 0,
  total_earnings DECIMAL DEFAULT 0,
  rating DECIMAL DEFAULT 5.0,
  address JSONB,
  preferences JSONB DEFAULT '{"notifications": true, "emailUpdates": true, "currency": "USD", "language": "en"}',
  documents JSONB DEFAULT '{"idVerified": false, "phoneVerified": false, "emailVerified": false}'
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL NOT NULL,
  deposit DECIMAL DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'inactive', 'pending', 'rented')),
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  location TEXT NOT NULL,
  rating DECIMAL DEFAULT 5.0,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  views INTEGER DEFAULT 0,
  bookings INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  availability JSONB DEFAULT '{"startDate": "2024-01-01", "endDate": "2024-12-31", "unavailableDates": []}',
  featured BOOLEAN DEFAULT false,
  condition TEXT DEFAULT 'good' CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
  min_rental_days INTEGER DEFAULT 1,
  max_rental_days INTEGER DEFAULT 30,
  delivery_options JSONB DEFAULT '{"pickup": true, "delivery": false, "deliveryFee": 0, "deliveryRadius": 0}',
  specifications JSONB DEFAULT '{}',
  policies JSONB DEFAULT '{"cancellation": "Standard cancellation policy", "damage": "Renter responsible for damages", "lateFee": 25}'
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  renter_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_amount DECIMAL NOT NULL,
  deposit DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'active', 'completed', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  notes TEXT,
  delivery_method TEXT DEFAULT 'pickup' CHECK (delivery_method IN ('pickup', 'delivery')),
  delivery_address TEXT
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  helpful INTEGER DEFAULT 0,
  response JSONB
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('booking', 'payment', 'review', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  action_url TEXT,
  metadata JSONB
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Products policies
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (status = 'active');

CREATE POLICY "Owners can manage their products" ON products
  FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "Admins can manage all products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Bookings policies
CREATE POLICY "Users can view their bookings" ON bookings
  FOR SELECT USING (auth.uid() = renter_id OR auth.uid() = owner_id);

CREATE POLICY "Users can create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = renter_id);

CREATE POLICY "Owners can update their bookings" ON bookings
  FOR UPDATE USING (auth.uid() = owner_id OR auth.uid() = renter_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Renters can create reviews" ON reviews
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE id = booking_id AND renter_id = auth.uid()
    )
  );

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Favorites policies
CREATE POLICY "Users can manage own favorites" ON favorites
  FOR ALL USING (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update product rating
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products 
  SET rating = (
    SELECT AVG(rating)::DECIMAL(3,2) 
    FROM reviews 
    WHERE product_id = NEW.product_id
  )
  WHERE id = NEW.product_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for review updates
CREATE OR REPLACE TRIGGER on_review_created
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- Function to create notification
CREATE OR REPLACE FUNCTION create_booking_notification()
RETURNS TRIGGER AS $$
BEGIN
  -- Notify owner of new booking
  INSERT INTO notifications (user_id, type, title, message, metadata)
  VALUES (
    NEW.owner_id,
    'booking',
    'New Booking Request',
    'You have received a new booking request for your product.',
    json_build_object('booking_id', NEW.id, 'product_id', NEW.product_id)
  );
  
  -- Notify renter of booking confirmation
  INSERT INTO notifications (user_id, type, title, message, metadata)
  VALUES (
    NEW.renter_id,
    'booking',
    'Booking Submitted',
    'Your booking request has been submitted successfully.',
    json_build_object('booking_id', NEW.id, 'product_id', NEW.product_id)
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for booking notifications
CREATE OR REPLACE TRIGGER on_booking_created
  AFTER INSERT ON bookings
  FOR EACH ROW EXECUTE FUNCTION create_booking_notification();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_owner_id ON products(owner_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_bookings_renter_id ON bookings(renter_id);
CREATE INDEX IF NOT EXISTS idx_bookings_owner_id ON bookings(owner_id);
CREATE INDEX IF NOT EXISTS idx_bookings_product_id ON bookings(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);