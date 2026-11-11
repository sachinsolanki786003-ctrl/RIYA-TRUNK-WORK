-- ========================================================
-- RIYA TRUNK WORK - SUPABASE DATABASE SCHEMA
-- Free Tier PostgreSQL Database Schema with Row Level Security (RLS)
-- ========================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_gu TEXT,
  name_hi TEXT,
  description TEXT,
  description_gu TEXT,
  description_hi TEXT,
  badge TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  name TEXT NOT NULL,
  name_gu TEXT,
  name_hi TEXT,
  slug TEXT UNIQUE NOT NULL,
  category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
  category_name TEXT,
  description TEXT,
  description_gu TEXT,
  description_hi TEXT,
  material TEXT,
  material_gu TEXT,
  material_hi TEXT,
  dimensions TEXT,
  capacity TEXT,
  capacity_gu TEXT,
  capacity_hi TEXT,
  price TEXT,
  price_gu TEXT,
  price_hi TEXT,
  price_numeric NUMERIC DEFAULT 0,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  availability TEXT DEFAULT 'In Stock',
  availability_gu TEXT,
  availability_hi TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  is_demo BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  product_id TEXT REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT,
  quantity TEXT DEFAULT '1',
  enquiry_type TEXT DEFAULT 'retail', -- 'retail', 'wholesale', 'general'
  message TEXT,
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'in_progress', 'completed', 'cancelled'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BUSINESS SETTINGS TABLE
CREATE TABLE IF NOT EXISTS business_settings (
  id TEXT PRIMARY KEY DEFAULT 'primary_settings',
  name TEXT NOT NULL DEFAULT 'RIYA TRUNK WORK',
  name_gu TEXT DEFAULT 'રિયા ટ્રંક વર્ક',
  name_hi TEXT DEFAULT 'रिया ट्रंक वर्क',
  tagline TEXT DEFAULT 'STORAGE, BUT MAKE IT ICONIC.',
  tagline_gu TEXT DEFAULT 'સ્ટોરેજ, પણ સાવ આઇકોનિક.',
  owner TEXT DEFAULT 'Mohanbhai P. Chauhan',
  phone TEXT DEFAULT '+91 97248 32538',
  phone_raw TEXT DEFAULT '919724832538',
  whatsapp TEXT DEFAULT '+91 97232 21997',
  whatsapp_raw TEXT DEFAULT '919723221997',
  address TEXT DEFAULT 'Shop No. 6, Devabhai Estate, Ahmedabad, Gujarat – 382340',
  address_gu TEXT DEFAULT 'દુકાન નં. ૬, દેવાભાઈ એસ્ટેટ, અમદાવાદ, ગુજરાત – ૩૮૨૩૪૦',
  timings TEXT DEFAULT 'Mon - Sat: 9:00 AM - 8:00 PM',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ADMIN PROFILES
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Categories Policies
CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Products Policies
CREATE POLICY "Public can view published products"
  ON products FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage all products"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Enquiries Policies
CREATE POLICY "Public can insert enquiries"
  ON enquiries FOR INSERT
  WITH CHECK (customer_name IS NOT NULL AND phone IS NOT NULL);

CREATE POLICY "Admins can view and manage enquiries"
  ON enquiries FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Business Settings Policies
CREATE POLICY "Public can view business settings"
  ON business_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can update business settings"
  ON business_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admin Profiles Policies
CREATE POLICY "Admins can view admin profiles"
  ON admin_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- ========================================================
-- SEED INITIAL DATA
-- ========================================================

INSERT INTO categories (id, slug, name, name_gu, name_hi, description, badge) VALUES
('metal-storage-boxes', 'metal-storage-boxes', 'Metal Storage Boxes', 'મેટલ સ્ટોરેજ બોક્સ (ટ્રંક / પેટીઓ)', 'मेटल स्टोरेज बॉक्स (ट्रंक / पेटियाँ)', 'Heavy-duty reinforced iron & steel trunks for long-lasting household, shop, and industrial security.', 'Most Popular'),
('grain-storage-drums', 'grain-storage-drums', 'Grain Storage Drums', 'અનાજ ભરવાની કોઠી / પીપ (Grain Drums)', 'अनाज भंडारण ड्रम / कोठी (Grain Drums)', 'Airtight, rodent-proof galvanized & metal grain storage containers.', 'Essential'),
('bedding-storage-trunks', 'bedding-storage-trunks', 'Bedding & Mattress Trunks', 'ગાદલા-ગોદડાના મોટા ટ્રંક (Bedding Trunks)', 'बिस्तर और गद्दों के बड़े ट्रंक (Bedding Trunks)', 'Jumbo-sized protective trunks designed specifically for quilts, blankets, and mattresses.', 'Jumbo Size'),
('stainless-steel-products', 'stainless-steel-products', 'Stainless Steel (SS) Products', 'સ્ટેનલેસ સ્ટીલ (SS) પ્રોડક્ટ્સ', 'स्टेनलेस स्टील (SS) प्रोडक्ट्स', 'Premium rust-proof 202/304 grade stainless steel containers and drums.', 'Rust-Proof'),
('galvanized-products', 'galvanized-products', 'Galvanized Metal Products', 'ગેલ્વેનાઈઝ્ડ પતરાના પ્રોડક્ટ્સ', 'गैल्वेनाइज्ड मेटल प्रोडक्ट्स', 'Corrosion-resistant GI sheet boxes and industrial storage bins.', 'Heavy Duty')
ON CONFLICT (id) DO NOTHING;

INSERT INTO business_settings (id, name, name_gu, name_hi, tagline, owner, phone, phone_raw, whatsapp, whatsapp_raw, address, address_gu)
VALUES (
  'primary_settings',
  'RIYA TRUNK WORK',
  'રિયા ટ્રંક વર્ક',
  'रिया ट्रंक वर्क',
  'STORAGE, BUT MAKE IT ICONIC.',
  'Mohanbhai P. Chauhan',
  '+91 97248 32538',
  '919724832538',
  '+91 97232 21997',
  '919723221997',
  'Shop No. 6, Devabhai Estate, Ahmedabad, Gujarat – 382340',
  'દુકાન નં. ૬, દેવાભાઈ એસ્ટેટ, અમદાવાદ, ગુજરાત – ૩૮૨૩૪૦'
) ON CONFLICT (id) DO NOTHING;
