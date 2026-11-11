# RIYA TRUNK WORK (રિયા ટ્રંક વર્ક)
### STORAGE, BUT MAKE IT ICONIC.

A high-performance, Gen Z-inspired premium industrial e-commerce and business website engineered for **RIYA TRUNK WORK**, an established wholesale and retail metal storage products supplier in Ahmedabad, Gujarat.

---

## 🏢 Verified Business Information

| Field | Detail |
|---|---|
| **Business Name** | **RIYA TRUNK WORK** |
| **Gujarati Name** | **રિયા ટ્રંક વર્ક** |
| **Hindi Name** | **रिया ट्रंक वर्क** |
| **Tagline** | **STORAGE, BUT MAKE IT ICONIC.** |
| **Proprietor / Contact** | **Mohanbhai P. Chauhan** |
| **Contact Number** | **+91 97248 32538** |
| **WhatsApp Number** | **+91 97232 21997** |
| **Official Address** | **Shop No. 6, Devabhai Estate, Ahmedabad, Gujarat – 382340** |
| **Business Type** | Wholesale & Retail Metal Products Supplier |

---

## ⚡ Key Highlights & Capabilities

1. **Gen Z Premium Industrial Aesthetics**:
   - Custom palette: Carbon Black (`#151515`), Warm Cream (`#F5F0E8`), Electric Orange (`#FF6538`), Metallic Silver (`#A8ADB2`), and Pure White (`#FFFFFF`).
   - Space Grotesk bold headlines, Inter sans-serif body, Outfit display accents.
   - Brutalist subtle shadow cards, Bento grid layouts, high-res industrial SVG product illustrations.
2. **Trilingual Support (3 Languages)**:
   - **Gujarati** (Default)
   - **Hindi**
   - **English**
   - Dynamic top bar switcher preserving state across all pages.
3. **Comprehensive Product Catalog**:
   - 5 core categories: Metal Storage Boxes, Grain Storage Drums (Kothi/Peep), Bedding & Mattress Trunks, Stainless Steel (SS 202/304) Products, Galvanized (GI) Metal Products.
   - Real-time search, category filter pills, sorting by name or featured status.
   - Dedicated Product Detail pages with dimension specs, material details, capacity, and direct WhatsApp enquiry generation.
4. **Seamless WhatsApp & Phone Leads**:
   - Floating pulsing WhatsApp button.
   - Automated product-specific message generator with pre-filled title, category, and quotation request.
   - Interactive quick enquiry modal with lead confirmation and confetti animation.
5. **Secure Admin Dashboard**:
   - Route protection with authentication.
   - Add, edit, delete products with custom image URLs or illustration models.
   - Real-time customer enquiry management with status updates (New, Contacted, Completed) and CSV export.
   - Business settings editor (name, phone, WhatsApp, address, timings).
6. **Dual Database Architecture (Zero Mandatory Spend)**:
   - Direct integration with **Supabase Free Tier** (PostgreSQL, RLS security policies, Auth, Storage).
   - Instant local storage fallback and sync so the application works out-of-the-box offline and without external API dependencies.
7. **SEO & Structured Data**:
   - Complete Open Graph, Twitter Cards, robots.txt, sitemap.xml.
   - Embedded Schema.org `LocalBusiness` JSON-LD markup targeting Ahmedabad and Gujarat metal trunk searches.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS 3
- **Routing**: React Router DOM 6
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti, Tailwind CSS keyframes
- **Backend & Database**: Supabase PostgreSQL (or Local Storage fallback)
- **Deployment**: Free Tier Vercel, Netlify, or GitHub Pages

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Navigate to the project directory
cd riya-trunk-work

# 2. Install dependencies (if not already installed)
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:3000` in your web browser.

---

## 🔐 Admin Dashboard Access

- **URL**: `http://localhost:3000/admin/login` (or `/admin/login` on your live site)
- **Default Admin Email**: `admin@riyatrunkwork.com`
- **Default Password**: `RiyaTrunk@2026`

*(When connected to Supabase, authentication is managed via Supabase Auth users)*

---

## 🌐 100% Free Hosting & Deployment

### Option A: Vercel Free Tier (Recommended)

1. Push this repository to your GitHub account:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/riya-trunk-work.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **Add New Project**, import `riya-trunk-work`.
4. Framework Preset: **Vite**
5. Root Directory: `./`
6. Click **Deploy**. Vercel will build and assign you a free HTTPS URL (e.g. `https://riya-trunk-work.vercel.app`).

### Option B: Netlify Free Tier

1. Go to [netlify.com](https://netlify.com) and log in.
2. Select **Add new site** > **Import an existing project**.
3. Choose your GitHub repository `riya-trunk-work`.
4. Build settings are auto-detected:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy Site**. Netlify uses the included `public/_redirects` file for seamless single-page application routing.

---

## 🗄️ Supabase Free Tier Database Setup

1. Create a free account at [supabase.com](https://supabase.com).
2. Create a new free project named `riya-trunk-work`.
3. Go to the **SQL Editor** tab in your Supabase dashboard.
4. Copy and paste the entire contents of [`supabase/schema.sql`](./supabase/schema.sql) and click **Run**.
5. Go to **Project Settings > API** and copy:
   - `Project URL`
   - `anon public key`
6. In your `.env` file (or in Vercel/Netlify Environment Variables):
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
7. Re-deploy or restart your app. The application will instantly switch to live PostgreSQL storage!

---

## 📄 License & Attribution

Manufactured & Operated by **Mohanbhai P. Chauhan**.  
Shop No. 6, Devabhai Estate, Ahmedabad, Gujarat – 382340.  
© 2026 RIYA TRUNK WORK. All Rights Reserved.
