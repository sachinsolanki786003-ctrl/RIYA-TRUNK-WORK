import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBusiness } from '../context/BusinessContext';
import { 
  Phone, MessageCircle, MapPin, Clock, Send, 
  CheckCircle2, ExternalLink, Navigation, AlertCircle 
} from 'lucide-react';
import { getWhatsAppLink, getPhoneLink } from '../lib/utils';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const { t, lang } = useLanguage();
  const { settings, submitEnquiry, categories } = useBusiness();

  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    product_name: '',
    quantity: '1',
    enquiry_type: 'retail',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const brandName = lang === 'gu' ? settings.nameGu || 'રિયા ટ્રંક વર્ક' : settings.name;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.customer_name.trim() || !formData.phone.trim()) {
      setError(t.contact.errorMsg);
      return;
    }

    setLoading(true);
    try {
      const result = await submitEnquiry({
        customer_name: formData.customer_name,
        phone: formData.phone,
        product_name: formData.product_name || 'General Inquiry',
        quantity: formData.quantity,
        enquiry_type: formData.enquiry_type,
        message: formData.message,
        status: 'new'
      });

      if (result.success) {
        setSuccess(true);
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch {}
      } else {
        setError(result.error || 'Failed to submit enquiry.');
      }
    } catch (err) {
      setError('An error occurred. Please contact us via WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappDirect = getWhatsAppLink({
    enquiryType: formData.enquiry_type,
    quantity: formData.quantity,
    customMessage: formData.message
  });

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-carbon text-cream text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
            COMMUNICATION PORTAL
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-carbon tracking-tight uppercase">
            {t.contact.heading}
          </h1>
          <p className="text-sm sm:text-base text-carbon/70 mt-2">
            {t.contact.subheading}
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Business Card & Quick Actions (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-carbon rounded-3xl border-3 border-carbon p-8 text-cream shadow-brutal space-y-6">
              
              <div>
                <span className="font-mono text-[11px] font-bold text-orange-electric uppercase tracking-widest block mb-1">
                  OFFICIAL BUSINESS REFERENCE
                </span>
                <h2 className="font-display font-black text-3xl text-white">
                  {settings.name}
                </h2>
                <p className="text-sm font-semibold text-silver mt-0.5">
                  {brandName}
                </p>
              </div>

              {/* Owner / Contact */}
              <div className="p-4 rounded-2xl bg-darkgrey border border-cream/15 space-y-1">
                <span className="font-mono text-[10px] text-silver uppercase font-bold">CONTACT PERSON / PROPRIETOR</span>
                <div className="font-display font-bold text-lg text-white">{settings.owner}</div>
                <div className="text-xs text-orange-electric font-semibold">{settings.businessType}</div>
              </div>

              {/* Phone & WhatsApp Quick Actions */}
              <div className="space-y-3">
                <a
                  href={getPhoneLink(settings.phone_raw || '919724832538')}
                  className="flex items-center justify-between p-4 rounded-2xl bg-darkgrey hover:bg-darkgrey-elevated border border-cream/15 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-electric/20 text-orange-electric flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-silver uppercase font-bold">{t.contact.phoneLabel}</div>
                      <div className="font-bold text-white text-sm group-hover:text-orange-electric transition-colors">{settings.phone}</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-orange-electric uppercase tracking-wider font-mono">CALL NOW →</span>
                </a>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-darkgrey hover:bg-darkgrey-elevated border border-cream/15 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-whatsapp/20 text-whatsapp flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-silver uppercase font-bold">{t.contact.whatsappLabel}</div>
                      <div className="font-bold text-white text-sm group-hover:text-whatsapp transition-colors">{settings.whatsapp}</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-whatsapp uppercase tracking-wider font-mono">WHATSAPP →</span>
                </a>
              </div>

              {/* Address */}
              <div className="p-4 rounded-2xl bg-darkgrey border border-cream/15 space-y-1.5 text-xs text-cream/70">
                <div className="flex items-center gap-2 text-white font-bold">
                  <MapPin className="w-4 h-4 text-orange-electric" />
                  <span>{t.contact.addressLabel}</span>
                </div>
                <p className="leading-relaxed pl-6">{settings.address}</p>
                <div className="pl-6 pt-1">
                  <a
                    href={settings.mapsDirectionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-orange-electric font-bold hover:underline"
                  >
                    <span>{t.contact.getDirections}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Contact & Lead Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-3 border-carbon p-8 sm:p-10 shadow-brutal space-y-6">
            
            {success ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-whatsapp/20 text-whatsapp rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="font-display font-black text-3xl text-carbon">
                  {t.contact.successMsg}
                </h3>
                <p className="text-sm text-carbon/70 max-w-md mx-auto">
                  Thank you, <strong>{formData.customer_name}</strong>. Mohanbhai P. Chauhan will review your enquiry for {formData.product_name || 'metal storage products'}.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={whatsappDirect}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-whatsapp text-white font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Open Enquiry in WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setFormData({
                        customer_name: '',
                        phone: '',
                        product_name: '',
                        quantity: '1',
                        enquiry_type: 'retail',
                        message: ''
                      });
                    }}
                    className="py-3.5 px-6 rounded-2xl bg-carbon text-cream font-bold text-xs uppercase tracking-wider hover:bg-carbon-light transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-orange-electric block mb-1">
                    SUBMIT INQUIRY
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-carbon uppercase">
                    {t.contact.formTitle}
                  </h2>
                  <p className="text-xs text-carbon/60 mt-1">
                    {t.contact.formSubtitle}
                  </p>
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-4 text-sm">
                  
                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-carbon mb-1">
                        {t.contact.fullName}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mohanlal"
                        value={formData.customer_name}
                        onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-carbon/20 bg-cream-light focus:outline-none focus:border-orange-electric focus:ring-1 focus:ring-orange-electric text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-carbon mb-1">
                        {t.contact.mobile}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 97248 32538"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-carbon/20 bg-cream-light focus:outline-none focus:border-orange-electric focus:ring-1 focus:ring-orange-electric text-sm"
                      />
                    </div>
                  </div>

                  {/* Product Interest & Quantity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-carbon mb-1">
                        {t.contact.productInterest}
                      </label>
                      <select
                        value={formData.product_name}
                        onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-carbon/20 bg-cream-light focus:outline-none focus:border-orange-electric focus:ring-1 focus:ring-orange-electric text-sm"
                      >
                        <option value="">Select a Category / Product...</option>
                        {categories.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                        <option value="Custom Metal Trunk">Custom Metal Trunk</option>
                        <option value="Grain Storage Drum (Kothi)">Grain Storage Drum (Kothi)</option>
                        <option value="Stainless Steel (SS) Box">Stainless Steel (SS) Box</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-carbon mb-1">
                        {t.contact.quantity}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1 unit / 15 wholesale boxes"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-carbon/20 bg-cream-light focus:outline-none focus:border-orange-electric focus:ring-1 focus:ring-orange-electric text-sm"
                      />
                    </div>
                  </div>

                  {/* Wholesale vs Retail Selection */}
                  <div>
                    <label className="block text-xs font-bold text-carbon mb-1.5">
                      {t.contact.enquiryType}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, enquiry_type: 'retail' })}
                        className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all ${
                          formData.enquiry_type === 'retail'
                            ? 'bg-carbon text-cream border-carbon'
                            : 'bg-cream-light text-carbon/70 border-carbon/20 hover:border-carbon'
                        }`}
                      >
                        {t.contact.retailOption}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, enquiry_type: 'wholesale' })}
                        className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all ${
                          formData.enquiry_type === 'wholesale'
                            ? 'bg-carbon text-cream border-carbon'
                            : 'bg-cream-light text-carbon/70 border-carbon/20 hover:border-carbon'
                        }`}
                      >
                        {t.contact.wholesaleOption}
                      </button>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-carbon mb-1">
                      {t.contact.message}
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Please mention preferred size, steel gauge, or delivery location in Ahmedabad/Gujarat..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-carbon/20 bg-cream-light focus:outline-none focus:border-orange-electric focus:ring-1 focus:ring-orange-electric text-sm resize-none"
                    ></textarea>
                  </div>

                </div>

                {/* Submit Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-4 px-6 rounded-2xl bg-orange-electric text-white font-display font-bold text-xs uppercase tracking-wider hover:bg-orange-hover transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? t.contact.submitting : t.contact.submitBtn}</span>
                  </button>

                  <a
                    href={whatsappDirect}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 px-6 rounded-2xl bg-whatsapp text-white font-display font-bold text-xs uppercase tracking-wider hover:bg-[#20b858] transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Send via WhatsApp</span>
                  </a>
                </div>

              </form>
            )}

          </div>

        </div>

        {/* Full-Width Map Frame */}
        <div className="rounded-3xl border-2 border-carbon overflow-hidden shadow-brutal bg-cream-dark min-h-[350px]">
          <iframe
            title="RIYA TRUNK WORK Google Maps Location"
            src={settings.mapEmbedUrl}
            className="w-full h-96 border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </div>
  );
}
