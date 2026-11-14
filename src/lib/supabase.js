import { createClient } from '@supabase/supabase-js'
import { initialProducts } from '../data/initialProducts'
import { defaultCategories } from '../data/categories'
import { defaultBusinessInfo } from '../data/businessInfo'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'YOUR_SUPABASE_URL' && 
  !supabaseUrl.includes('placeholder')
)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Local Storage Fallback Store Keys
const STORAGE_KEYS = {
  PRODUCTS: 'rtw_products_v3',
  CATEGORIES: 'rtw_categories_v3',
  ENQUIRIES: 'rtw_enquiries_v1',
  SETTINGS: 'rtw_settings_v2',
  ADMIN_SESSION: 'rtw_admin_session_v1'
}

// Helpers for Local Storage
export const localStore = {
  getProducts: () => {
    try {
      // Clear legacy storage key if exists
      localStorage.removeItem('rtw_products_v2')
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Ensure removed products are filtered out
        const filtered = parsed.filter(p => p.id !== 'rtw-prod-005' && p.id !== 'rtw-prod-006')
        if (filtered.length !== parsed.length) {
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered))
        }
        return filtered
      }
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(initialProducts))
      return initialProducts
    } catch {
      return initialProducts
    }
  },
  saveProducts: (products) => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products))
  },
  getCategories: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES)
      if (stored) return JSON.parse(stored)
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(defaultCategories))
      return defaultCategories
    } catch {
      return defaultCategories
    }
  },
  saveCategories: (categories) => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories))
  },
  getEnquiries: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ENQUIRIES)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  },
  addEnquiry: (enquiry) => {
    const enquiries = localStore.getEnquiries()
    const newEnquiry = {
      id: 'enq-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      ...enquiry,
      status: enquiry.status || 'new',
      created_at: new Date().toISOString()
    }
    const updated = [newEnquiry, ...enquiries]
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated))
    return newEnquiry
  },
  updateEnquiryStatus: (id, status) => {
    const enquiries = localStore.getEnquiries()
    const updated = enquiries.map(e => e.id === id ? { ...e, status } : e)
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated))
    return updated
  },
  deleteEnquiry: (id) => {
    const enquiries = localStore.getEnquiries()
    const updated = enquiries.filter(e => e.id !== id)
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated))
    return updated
  },
  getSettings: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS)
      return stored ? JSON.parse(stored) : defaultBusinessInfo
    } catch {
      return defaultBusinessInfo
    }
  },
  saveSettings: (settings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
  },
  getAdminSession: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  },
  setAdminSession: (user) => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(user))
  },
  clearAdminSession: () => {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION)
  }
}
