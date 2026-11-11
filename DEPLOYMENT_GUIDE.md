# RIYA TRUNK WORK – ZERO-COST DEPLOYMENT & HOSTING GUIDE

This guide provides step-by-step instructions to take the RIYA TRUNK WORK web application live on the internet with a public HTTPS URL without spending a single rupee.

---

## 📋 Pre-requisites (All 100% Free)

1. A free GitHub account ([github.com](https://github.com))
2. A free Vercel account ([vercel.com](https://vercel.com)) OR Netlify account ([netlify.com](https://netlify.com))
3. Optional: A free Supabase account ([supabase.com](https://supabase.com)) if you want PostgreSQL cloud database hosting

---

## STEP 1: Push Code to GitHub

Open PowerShell or Terminal on your Windows computer:

```powershell
cd C:\Users\SACHIN\.gemini\antigravity\scratch\riya-trunk-work

# 1. Verify git status
git status

# 2. Create a new empty repository on github.com named 'riya-trunk-work'
# 3. Connect remote and push:
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/riya-trunk-work.git
git branch -M main
git push -u origin main
```

---

## STEP 2: Deploy to Vercel (Recommended – 2 Minutes)

1. Open [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** > **"Project"**.
3. In the list of GitHub repositories, find `riya-trunk-work` and click **"Import"**.
4. Configure Project:
   - **Framework Preset**: Vite (detected automatically)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Optional Environment Variables (if using Supabase):
   - `VITE_SUPABASE_URL` = `https://your-id.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-anon-key`
   *(If omitted, the app will automatically use its built-in LocalStore engine)*
6. Click **"Deploy"**.
7. In ~30 seconds, your site will be live at:
   `https://riya-trunk-work.vercel.app` (or your custom free Vercel subdomain).

---

## STEP 3: Single Page App (SPA) Routing Verification

Both `vercel.json` and `public/_redirects` are already pre-configured in the repository:
- `vercel.json`: Handles deep-linking rewrites so refreshing `/products/rtw-prod-001` or `/contact` loads cleanly without 404 errors.
- `public/_redirects`: Provides native fallback for Netlify and Cloudflare Pages.

---

## STEP 4: Setting up Free Supabase Cloud Database (Optional)

1. Go to [supabase.com](https://supabase.com) and click **"Start your project"**.
2. Create an organization and new project:
   - Name: `riya-trunk-work-db`
   - Database Password: Choose a secure password (save it safely).
   - Region: `South Asia (Mumbai)` for fastest response times in India.
3. Open the **SQL Editor** tab from the left sidebar.
4. Click **"New Query"** and paste the code from [`supabase/schema.sql`](./supabase/schema.sql).
5. Click **"Run"**. All tables (`products`, `categories`, `enquiries`, `business_settings`) and Row-Level-Security (RLS) policies will be created.
6. Open **Settings > API**:
   - Copy `Project URL`
   - Copy `anon public` key
7. Paste these values in your Vercel Project Settings under **Environment Variables**.
8. Redeploy to activate live cloud database synchronization!
