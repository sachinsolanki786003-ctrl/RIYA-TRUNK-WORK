# RIYA TRUNK WORK – ADMIN OPERATIONS & PRODUCT MANAGEMENT GUIDE

This guide provides operating procedures for **Mohanbhai P. Chauhan** and authorized staff to manage the website, inventory, customer enquiries, and business information.

---

## 🔐 1. Admin Login

1. Navigate to `/admin/login` on your website (e.g. `https://your-site.vercel.app/admin/login` or `http://localhost:3000/admin/login`).
2. Enter the administrator credentials:
   - **Email / Username**: `admin@riyatrunkwork.com` (or `mohanbhai@riyatrunkwork.com` or `admin`)
   - **Password**: `RiyaTrunk@2026`
3. Click **"Sign In to Dashboard"**.

---

## 📦 2. Product Management

### A. Adding a New Product
1. Go to the **"Products"** tab on the admin dashboard.
2. Click the orange **"+ Add New Product"** button.
3. Fill in the details:
   - **Product Name (English)**: e.g. `Jumbo Storage Box 40 Inch`
   - **Product Name (Gujarati)**: e.g. `જમ્બો સ્ટોરેજ પેટી ૪૦ ઇંચ`
   - **Category**: Select from the 5 core categories (Metal Boxes, Grain Drums, Bedding Trunks, SS Products, Galvanized Products).
   - **Illustration Model**: Choose the 3D-styled SVG illustration or specify a photo URL.
   - **Material**: e.g. `20 Gauge CRC Sheet Metal`
   - **Dimensions**: e.g. `40" L x 24" W x 20" H`
   - **Capacity**: e.g. `250 Liters`
   - **Price**: e.g. `₹2,800 Retail / Wholesale on Request` or `Contact for Wholesale Price`
   - **Availability**: e.g. `In Stock` or `Available on Order`
   - **Description**: Brief explanation of hinges, latches, and usage.
   - **Toggles**:
     - *Feature on Homepage*: Displays the card in the top featured bento section.
     - *Published*: Controls customer visibility.
4. Click **"Save Product"**. The catalog updates immediately!

### B. Editing an Existing Product
1. Locate the product in the table.
2. Click the pencil (edit) icon on the right side.
3. Update specifications or pricing, then click **"Save Product"**.

### C. Deleting a Product
1. Click the red trash icon next to the product.
2. Confirm the prompt to remove it.

---

## 📩 3. Customer Enquiry Management

1. Click on the **"Enquiries"** tab.
2. Every form submitted from the Contact page or individual Product detail pages appears here in real time.
3. Each enquiry card shows:
   - Customer Name
   - Mobile Number
   - Product of Interest & Requested Quantity
   - Enquiry Type (Retail or Wholesale)
   - Message / Custom Dimensions
   - Submission Timestamp
4. **Immediate Actions**:
   - Click **"WhatsApp"** to open a direct chat with the lead.
   - Click **"Call Lead"** to dial their phone number directly.
   - Update the status dropdown to **Contacted** or **Completed** to track follow-ups.
5. **Exporting to Excel / CSV**:
   - Click the **"Export CSV"** button at the top right to download a spreadsheet of all customer enquiries.

---

## ⚙️ 4. Updating Business Settings

1. Click the **"Business Settings"** tab.
2. You can edit:
   - Business Name (English & Gujarati)
   - Owner / Contact Person name
   - Tagline
   - Phone Numbers
   - WhatsApp Number
   - Physical Store Address (Shop No. 6, Devabhai Estate)
   - Shop Timings
3. Click **"Save Business Settings"**. The entire website header, footer, contact page, and map banners update instantly.

---

## 💾 5. Data Backup & Recovery

- **If using Local Storage mode**: All products and enquiries are saved in the browser's persistent storage. You can backup enquiries anytime by clicking **"Export CSV"**.
- **If using Supabase Cloud Database**:
  1. Open your Supabase Dashboard at [supabase.com](https://supabase.com).
  2. Go to **Table Editor** > `products` or `enquiries`.
  3. Click the **Export** icon to download a `.csv` or `.json` backup of your data.
  4. Automatic daily backups are handled on Supabase's cloud infrastructure.
