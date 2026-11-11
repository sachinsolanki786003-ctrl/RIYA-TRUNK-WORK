import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBusiness } from '../context/BusinessContext';
import { 
  Package, Inbox, Settings, LogOut, Plus, Trash2, Edit3, 
  CheckCircle, XCircle, Search, Filter, Phone, MessageCircle, 
  ExternalLink, Download, ShieldCheck, Database, RefreshCw, Save 
} from 'lucide-react';
import { getWhatsAppLink, getPhoneLink } from '../lib/utils';
import ProductIllustration from '../components/ui/ProductIllustration';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { 
    adminUser, logoutAdmin, products, categories, enquiries, settings,
    addProduct, updateProduct, deleteProduct, updateEnquiryStatus, deleteEnquiry,
    updateBusinessSettings, isSupabaseConfigured 
  } = useBusiness();

  const [activeTab, setActiveTab] = useState('products'); // 'products', 'enquiries', 'settings'

  // Product Form State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [prodForm, setProdForm] = useState({
    name: '',
    nameGu: '',
    category_id: 'metal-storage-boxes',
    categoryName: 'Metal Storage Boxes',
    material: '',
    dimensions: '',
    capacity: '',
    price: 'Contact for Wholesale Price',
    shortDescription: '',
    fullDescription: '',
    availability: 'In Stock',
    featured: false,
    published: true,
    imageType: 'svg-trunk-classic',
    images: []
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState(settings);
  const [settingsSavedMsg, setSettingsSavedMsg] = useState(false);

  // Enquiry filters
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('all');
  const [productSearch, setProductSearch] = useState('');

  // Protect route
  useEffect(() => {
    if (!adminUser) {
      navigate('/admin/login');
    }
  }, [adminUser, navigate]);

  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  if (!adminUser) return null;

  // Open add modal
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setProdForm({
      name: '',
      nameGu: '',
      category_id: categories[0]?.id || 'metal-storage-boxes',
      categoryName: categories[0]?.name || 'Metal Storage Boxes',
      material: 'CRC Steel Sheet / Galvanized',
      dimensions: '36" L x 20" W x 18" H',
      capacity: 'Approx. 150 Liters',
      price: 'Contact for Wholesale / Retail Price',
      shortDescription: '',
      fullDescription: '',
      availability: 'In Stock',
      featured: false,
      published: true,
      imageType: 'svg-trunk-classic',
      images: []
    });
    setProductModalOpen(true);
  };

  // Open edit modal
  const handleOpenEditModal = (p) => {
    setEditingProduct(p);
    setProdForm({
      name: p.name || '',
      nameGu: p.nameGu || '',
      category_id: p.category_id || categories[0]?.id || 'metal-storage-boxes',
      categoryName: p.categoryName || categories[0]?.name || 'Metal Storage Boxes',
      material: p.material || '',
      dimensions: p.dimensions || '',
      capacity: p.capacity || '',
      price: p.price || '',
      shortDescription: p.shortDescription || p.description || '',
      fullDescription: p.fullDescription || p.description || '',
      availability: p.availability || 'In Stock',
      featured: Boolean(p.featured),
      published: p.published !== false,
      imageType: p.imageType || 'svg-trunk-classic',
      images: p.images || []
    });
    setProductModalOpen(true);
  };

  // Submit product
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const matchedCategory = categories.find(c => c.id === prodForm.category_id);
    const payload = {
      ...prodForm,
      categoryName: matchedCategory?.name || prodForm.categoryName
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, payload);
    } else {
      await addProduct(payload);
    }
    setProductModalOpen(false);
  };

  // Delete product
  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteProduct(id);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    await updateBusinessSettings(settingsForm);
    setSettingsSavedMsg(true);
    setTimeout(() => setSettingsSavedMsg(false), 3000);
  };

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter(enq => {
    if (enquiryStatusFilter === 'all') return true;
    return enq.status === enquiryStatusFilter;
  });

  // Export Enquiries to CSV
  const exportEnquiriesToCSV = () => {
    if (enquiries.length === 0) {
      alert('No enquiries to export.');
      return;
    }
    const headers = ['ID', 'Customer Name', 'Phone', 'Product', 'Quantity', 'Type', 'Status', 'Date', 'Message'];
    const rows = enquiries.map(e => [
      e.id,
      `"${e.customer_name?.replace(/"/g, '""') || ''}"`,
      `"${e.phone || ''}"`,
      `"${e.product_name?.replace(/"/g, '""') || ''}"`,
      `"${e.quantity || ''}"`,
      e.enquiry_type || 'retail',
      e.status || 'new',
      e.created_at || '',
      `"${e.message?.replace(/"/g, '""') || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rtw_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-8 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Admin Header Bar */}
        <div className="bg-white rounded-3xl border-3 border-carbon p-6 shadow-brutal flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-carbon rounded-2xl p-2 flex items-center justify-center border-2 border-orange-electric shadow-brutal-sm">
              <Package className="w-6 h-6 text-orange-electric" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-2xl text-carbon uppercase">
                  MANAGEMENT DASHBOARD
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-orange-electric text-white text-[10px] font-mono font-bold uppercase">
                  {adminUser.role || 'Admin'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-carbon/60 mt-0.5">
                <span>RIYA TRUNK WORK • Shop No. 6, Devabhai Estate</span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Database className="w-3 h-3 text-orange-electric" />
                  {isSupabaseConfigured ? 'Supabase Live DB' : 'Local Storage Sync Store'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                logoutAdmin();
                navigate('/admin/login');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-carbon text-cream text-xs font-bold uppercase tracking-wider hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('products')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-display font-bold text-xs uppercase tracking-wider transition-all ${
              activeTab === 'products'
                ? 'bg-carbon text-cream shadow-brutal-sm'
                : 'bg-white text-carbon/70 border border-carbon/15 hover:border-carbon'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-display font-bold text-xs uppercase tracking-wider transition-all relative ${
              activeTab === 'enquiries'
                ? 'bg-carbon text-cream shadow-brutal-sm'
                : 'bg-white text-carbon/70 border border-carbon/15 hover:border-carbon'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Enquiries ({enquiries.length})</span>
            {enquiries.filter(e => e.status === 'new').length > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-orange-electric animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-display font-bold text-xs uppercase tracking-wider transition-all ${
              activeTab === 'settings'
                ? 'bg-carbon text-cream shadow-brutal-sm'
                : 'bg-white text-carbon/70 border border-carbon/15 hover:border-carbon'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Business Settings</span>
          </button>
        </div>

        {/* TAB 1: PRODUCT MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-black text-xl text-carbon uppercase">
                  Catalog Inventory
                </h2>
                <p className="text-xs text-carbon/60">
                  Manage trunk specifications, materials, categories, and stock availability.
                </p>
              </div>

              <button
                onClick={handleOpenAddModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-orange-electric text-white font-bold text-xs uppercase tracking-wider hover:bg-orange-hover transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Table Bento */}
            <div className="bg-white rounded-3xl border-2 border-carbon overflow-hidden shadow-brutal">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-carbon text-cream font-mono uppercase tracking-wider text-[11px] border-b-2 border-carbon">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Material / Dimensions</th>
                      <th className="py-3 px-4">Price / Terms</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-carbon/10">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-cream-light/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-10 bg-cream rounded-lg border border-carbon/20 p-1 flex items-center justify-center shrink-0">
                              <ProductIllustration type={p.imageType || 'svg-trunk-classic'} className="w-full h-full" />
                            </div>
                            <div>
                              <div className="font-bold text-carbon text-sm">{p.name}</div>
                              {p.nameGu && <div className="text-[11px] text-carbon/60">{p.nameGu}</div>}
                              <div className="font-mono text-[10px] text-carbon/40">{p.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-carbon/80">{p.categoryName || p.category_id}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-carbon/90 font-medium truncate max-w-[200px]" title={p.material}>{p.material}</div>
                          <div className="text-[11px] text-carbon/50 font-mono">{p.dimensions}</div>
                        </td>
                        <td className="py-3 px-4 font-bold text-carbon">
                          {p.price || 'Contact for Price'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-block px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                              p.published !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {p.published !== false ? 'Published' : 'Draft'}
                            </span>
                            {p.featured && (
                              <span className="inline-block px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-orange-electric/20 text-orange-electric">
                                Featured
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(p)}
                              className="p-2 rounded-xl bg-carbon/5 hover:bg-carbon hover:text-cream text-carbon transition-colors"
                              title="Edit product"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="p-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ENQUIRIES MANAGEMENT */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-black text-xl text-carbon uppercase">
                  Customer Enquiries ({filteredEnquiries.length})
                </h2>
                <p className="text-xs text-carbon/60">
                  Leads and requests submitted via website contact form, product pages, and direct WhatsApp.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={enquiryStatusFilter}
                  onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                  className="py-2.5 px-4 rounded-xl border border-carbon/20 bg-white text-xs font-bold text-carbon focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                </select>

                <button
                  onClick={exportEnquiriesToCSV}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-carbon text-cream text-xs font-bold uppercase tracking-wider hover:bg-orange-electric hover:text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {filteredEnquiries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredEnquiries.map((enq) => {
                  const leadPhone = enq.phone ? enq.phone.replace(/[^0-9]/g, '') : '';
                  const quickWa = `https://wa.me/${leadPhone}?text=${encodeURIComponent(`Hello ${enq.customer_name}, this is Mohanbhai Chauhan from RIYA TRUNK WORK regarding your enquiry for ${enq.product_name || 'metal storage products'}.`)}`;

                  return (
                    <div key={enq.id} className="bg-white rounded-3xl border-2 border-carbon p-6 shadow-brutal flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                            enq.status === 'new' ? 'bg-orange-electric text-white' : 'bg-carbon text-cream'
                          }`}>
                            {enq.status || 'New'}
                          </span>
                          <span className="font-mono text-[10px] text-carbon/50">
                            {enq.created_at ? new Date(enq.created_at).toLocaleDateString() : 'Recent'}
                          </span>
                        </div>

                        <div>
                          <div className="text-xs font-mono font-bold text-orange-electric uppercase">
                            {enq.enquiry_type || 'Retail'} Enquiry
                          </div>
                          <h3 className="font-display font-extrabold text-lg text-carbon">
                            {enq.customer_name}
                          </h3>
                          <div className="text-xs font-bold text-carbon/80 mt-0.5">
                            Phone: {enq.phone}
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-cream text-xs space-y-1">
                          <div className="font-bold text-carbon">{enq.product_name || 'General Product'}</div>
                          {enq.quantity && <div className="text-carbon/60 text-[11px]">Qty: {enq.quantity}</div>}
                          {enq.message && <p className="text-carbon/70 italic text-[11px] pt-1">"{enq.message}"</p>}
                        </div>
                      </div>

                      {/* Status Update & Direct Connect */}
                      <div className="pt-3 border-t border-carbon/10 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-carbon/60">Status:</span>
                          <select
                            value={enq.status || 'new'}
                            onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                            className="py-1 px-2.5 rounded-lg border border-carbon/20 text-xs font-bold bg-cream-light"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href={quickWa}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-whatsapp text-white text-xs font-bold hover:brightness-105 transition-all text-center"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`tel:${enq.phone}`}
                            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-carbon text-cream text-xs font-bold hover:bg-carbon-light transition-all text-center"
                          >
                            <Phone className="w-3.5 h-3.5 text-orange-electric" />
                            <span>Call Lead</span>
                          </a>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border-2 border-carbon p-8">
                <p className="text-sm font-semibold text-carbon/60">No enquiries matching the filter.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: BUSINESS SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="font-display font-black text-xl text-carbon uppercase">
                Official Business Information
              </h2>
              <p className="text-xs text-carbon/60">
                Update store name, contact numbers, official WhatsApp, address, and timings.
              </p>
            </div>

            {settingsSavedMsg && (
              <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Business settings successfully updated and saved!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl border-2 border-carbon p-8 shadow-brutal space-y-5 text-sm">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-carbon mb-1">
                    Business Name (English)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-carbon/20 bg-cream-light font-sans text-sm focus:outline-none focus:border-orange-electric"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-carbon mb-1">
                    Gujarati Name (ગુજરાતી નામ)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.nameGu}
                    onChange={(e) => setSettingsForm({ ...settingsForm, nameGu: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-carbon/20 bg-cream-light font-sans text-sm focus:outline-none focus:border-orange-electric"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-carbon mb-1">
                    Owner / Contact Person
                  </label>
                  <input
                    type="text"
                    value={settingsForm.owner}
                    onChange={(e) => setSettingsForm({ ...settingsForm, owner: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-carbon/20 bg-cream-light font-sans text-sm focus:outline-none focus:border-orange-electric"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-carbon mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-carbon/20 bg-cream-light font-sans text-sm focus:outline-none focus:border-orange-electric"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-carbon mb-1">
                    Phone Number (Display)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-carbon/20 bg-cream-light font-sans text-sm focus:outline-none focus:border-orange-electric"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-carbon mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsapp}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-carbon/20 bg-cream-light font-sans text-sm focus:outline-none focus:border-orange-electric"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-carbon mb-1">
                  Official Business Address (As on visiting card)
                </label>
                <input
                  type="text"
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-carbon/20 bg-cream-light font-sans text-sm focus:outline-none focus:border-orange-electric"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-carbon mb-1">
                  Shop Timings
                </label>
                <input
                  type="text"
                  value={settingsForm.timings}
                  onChange={(e) => setSettingsForm({ ...settingsForm, timings: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-carbon/20 bg-cream-light font-sans text-sm focus:outline-none focus:border-orange-electric"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-carbon text-cream font-display font-bold text-xs uppercase tracking-wider hover:bg-orange-electric hover:text-white transition-colors shadow-brutal-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Business Settings</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>

      {/* Product Add / Edit Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white w-full max-w-2xl rounded-3xl border-3 border-carbon p-6 sm:p-8 shadow-brutal-lg max-h-[90vh] overflow-y-auto space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-carbon/10">
              <h3 className="font-display font-black text-xl text-carbon uppercase">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setProductModalOpen(false)}
                className="text-carbon/60 hover:text-carbon font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-carbon mb-1">Product Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={prodForm.name}
                    onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-carbon/20 bg-cream-light text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-carbon mb-1">Product Name (Gujarati)</label>
                  <input
                    type="text"
                    value={prodForm.nameGu}
                    onChange={(e) => setProdForm({ ...prodForm, nameGu: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-carbon/20 bg-cream-light text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-carbon mb-1">Category *</label>
                  <select
                    value={prodForm.category_id}
                    onChange={(e) => setProdForm({ ...prodForm, category_id: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-carbon/20 bg-cream-light text-xs font-bold"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-carbon mb-1">Illustration Model</label>
                  <select
                    value={prodForm.imageType}
                    onChange={(e) => setProdForm({ ...prodForm, imageType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-carbon/20 bg-cream-light text-xs font-bold"
                  >
                    <option value="svg-trunk-classic">Classic Metal Trunk</option>
                    <option value="svg-drum-grain">Grain Storage Drum</option>
                    <option value="svg-trunk-jumbo">Jumbo Bedding Trunk</option>
                    <option value="svg-ss-box">Stainless Steel (SS) Box</option>
                    <option value="svg-gi-box">Galvanized Metal Box</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-carbon mb-1">Material</label>
                  <input
                    type="text"
                    value={prodForm.material}
                    onChange={(e) => setProdForm({ ...prodForm, material: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-carbon/20 bg-cream-light text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-carbon mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={prodForm.dimensions}
                    onChange={(e) => setProdForm({ ...prodForm, dimensions: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-carbon/20 bg-cream-light text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-carbon mb-1">Capacity</label>
                  <input
                    type="text"
                    value={prodForm.capacity}
                    onChange={(e) => setProdForm({ ...prodForm, capacity: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-carbon/20 bg-cream-light text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-carbon mb-1">Price / Quotation Term</label>
                  <input
                    type="text"
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-carbon/20 bg-cream-light text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-carbon mb-1">Availability</label>
                  <input
                    type="text"
                    value={prodForm.availability}
                    onChange={(e) => setProdForm({ ...prodForm, availability: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-carbon/20 bg-cream-light text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-carbon mb-1">Short Description</label>
                <textarea
                  rows="2"
                  value={prodForm.shortDescription}
                  onChange={(e) => setProdForm({ ...prodForm, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-carbon/20 bg-cream-light text-xs"
                ></textarea>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-carbon">
                  <input
                    type="checkbox"
                    checked={prodForm.featured}
                    onChange={(e) => setProdForm({ ...prodForm, featured: e.target.checked })}
                    className="rounded border-carbon text-orange-electric focus:ring-orange-electric"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-carbon">
                  <input
                    type="checkbox"
                    checked={prodForm.published}
                    onChange={(e) => setProdForm({ ...prodForm, published: e.target.checked })}
                    className="rounded border-carbon text-orange-electric focus:ring-orange-electric"
                  />
                  <span>Published (Visible to Customers)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-carbon/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-cream-light border border-carbon text-carbon font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-orange-electric text-white font-bold text-xs uppercase tracking-wider hover:bg-orange-hover transition-colors shadow-sm"
                >
                  Save Product
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
