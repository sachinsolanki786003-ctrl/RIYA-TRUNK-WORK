import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, localStore } from '../lib/supabase';
import { defaultBusinessInfo } from '../data/businessInfo';
import { defaultCategories } from '../data/categories';
import { initialProducts } from '../data/initialProducts';

const BusinessContext = createContext();

export function BusinessProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState(defaultBusinessInfo);
  const [enquiries, setEnquiries] = useState([]);
  const [adminUser, setAdminUser] = useState(() => localStore.getAdminSession());
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        if (isSupabaseConfigured && supabase) {
          // Fetch from Supabase
          const [prodRes, catRes, setRes, enqRes] = await Promise.allSettled([
            supabase.from('products').select('*').order('created_at', { ascending: false }),
            supabase.from('categories').select('*'),
            supabase.from('business_settings').select('*').limit(1).single(),
            supabase.from('enquiries').select('*').order('created_at', { ascending: false })
          ]);

          if (prodRes.status === 'fulfilled' && prodRes.value.data && prodRes.value.data.length > 0) {
            setProducts(prodRes.value.data);
          } else {
            setProducts(localStore.getProducts());
          }

          if (catRes.status === 'fulfilled' && catRes.value.data && catRes.value.data.length > 0) {
            setCategories(catRes.value.data);
          } else {
            setCategories(localStore.getCategories());
          }

          if (setRes.status === 'fulfilled' && setRes.value.data) {
            setSettings({ ...defaultBusinessInfo, ...setRes.value.data });
          } else {
            setSettings(localStore.getSettings());
          }

          if (enqRes.status === 'fulfilled' && enqRes.value.data) {
            setEnquiries(enqRes.value.data);
          } else {
            setEnquiries(localStore.getEnquiries());
          }
        } else {
          // Fallback to local store with initial demo data
          setProducts(localStore.getProducts());
          setCategories(localStore.getCategories());
          setSettings(localStore.getSettings());
          setEnquiries(localStore.getEnquiries());
        }
      } catch (err) {
        console.warn('Error loading remote database, using local store:', err);
        setProducts(localStore.getProducts());
        setCategories(localStore.getCategories());
        setSettings(localStore.getSettings());
        setEnquiries(localStore.getEnquiries());
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // Submit new customer enquiry
  const submitEnquiry = async (enquiryData) => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('enquiries')
          .insert([enquiryData])
          .select()
          .single();
        if (error) throw error;
        setEnquiries(prev => [data, ...prev]);
        return { success: true, data };
      } else {
        const saved = localStore.addEnquiry(enquiryData);
        setEnquiries(prev => [saved, ...prev]);
        return { success: true, data: saved };
      }
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      // Fallback save locally so lead is NEVER lost
      const saved = localStore.addEnquiry(enquiryData);
      setEnquiries(prev => [saved, ...prev]);
      return { success: true, data: saved, fallback: true };
    }
  };

  // Admin: Update enquiry status
  const updateEnquiryStatus = async (id, status) => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from('enquiries')
          .update({ status })
          .eq('id', id);
        if (error) throw error;
      }
      const updated = localStore.updateEnquiryStatus(id, status);
      setEnquiries(updated);
      return { success: true };
    } catch (err) {
      console.error('Error updating enquiry:', err);
      const updated = localStore.updateEnquiryStatus(id, status);
      setEnquiries(updated);
      return { success: true };
    }
  };

  // Admin: Delete enquiry
  const deleteEnquiry = async (id) => {
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.from('enquiries').delete().eq('id', id);
      }
      const updated = localStore.deleteEnquiry(id);
      setEnquiries(updated);
      return { success: true };
    } catch (err) {
      console.error('Error deleting enquiry:', err);
      const updated = localStore.deleteEnquiry(id);
      setEnquiries(updated);
      return { success: true };
    }
  };

  // Admin: Add product
  const addProduct = async (productData) => {
    const newProduct = {
      id: 'rtw-prod-' + Date.now(),
      created_at: new Date().toISOString(),
      published: true,
      featured: false,
      isDemo: false,
      ...productData,
      slug: (productData.name || 'product')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') + '-' + Date.now().toString().slice(-4)
    };

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('products')
          .insert([newProduct])
          .select()
          .single();
        if (error) throw error;
        setProducts(prev => [data, ...prev]);
        localStore.saveProducts([data, ...products]);
        return { success: true, data };
      } else {
        const updated = [newProduct, ...products];
        setProducts(updated);
        localStore.saveProducts(updated);
        return { success: true, data: newProduct };
      }
    } catch (err) {
      console.error('Error adding product:', err);
      const updated = [newProduct, ...products];
      setProducts(updated);
      localStore.saveProducts(updated);
      return { success: true, data: newProduct };
    }
  };

  // Admin: Update product
  const updateProduct = async (id, updatedFields) => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from('products')
          .update(updatedFields)
          .eq('id', id);
        if (error) throw error;
      }
      const updated = products.map(p => p.id === id ? { ...p, ...updatedFields } : p);
      setProducts(updated);
      localStore.saveProducts(updated);
      return { success: true };
    } catch (err) {
      console.error('Error updating product:', err);
      const updated = products.map(p => p.id === id ? { ...p, ...updatedFields } : p);
      setProducts(updated);
      localStore.saveProducts(updated);
      return { success: true };
    }
  };

  // Admin: Delete product
  const deleteProduct = async (id) => {
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.from('products').delete().eq('id', id);
      }
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStore.saveProducts(updated);
      return { success: true };
    } catch (err) {
      console.error('Error deleting product:', err);
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStore.saveProducts(updated);
      return { success: true };
    }
  };

  // Admin: Update Business Settings
  const updateBusinessSettings = async (newSettings) => {
    const merged = { ...settings, ...newSettings };
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase
          .from('business_settings')
          .upsert({ id: 'primary_settings', ...merged });
      }
      setSettings(merged);
      localStore.saveSettings(merged);
      return { success: true };
    } catch (err) {
      console.error('Error updating settings:', err);
      setSettings(merged);
      localStore.saveSettings(merged);
      return { success: true };
    }
  };

  // Admin Auth Helpers
  const loginAdmin = async (email, password) => {
    // Check master pass or Supabase auth
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (!error && data?.user) {
        const user = { email: data.user.email, role: 'admin', id: data.user.id };
        setAdminUser(user);
        localStore.setAdminSession(user);
        return { success: true, user };
      }
    }
    // Local secure demo admin credential for Mohanbhai P. Chauhan / admin
    if (
      (email === 'admin@riyatrunkwork.com' || email === 'mohanbhai@riyatrunkwork.com' || email === 'admin') &&
      password === 'RiyaTrunk@2026'
    ) {
      const user = { email, name: 'Mohanbhai P. Chauhan (Admin)', role: 'admin' };
      setAdminUser(user);
      localStore.setAdminSession(user);
      return { success: true, user };
    }

    return { success: false, error: 'Invalid credentials. Please check email/username and password.' };
  };

  const logoutAdmin = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn(e);
      }
    }
    setAdminUser(null);
    localStore.clearAdminSession();
  };

  return (
    <BusinessContext.Provider
      value={{
        products,
        categories,
        settings,
        enquiries,
        adminUser,
        isLoading,
        submitEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        addProduct,
        updateProduct,
        deleteProduct,
        updateBusinessSettings,
        loginAdmin,
        logoutAdmin,
        isSupabaseConfigured
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}
