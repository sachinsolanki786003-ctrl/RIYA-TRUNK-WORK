import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useBusiness } from '../../context/BusinessContext';
import { X, Send, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { getWhatsAppLink, getPhoneLink } from '../../lib/utils';
import confetti from 'canvas-confetti';

export default function EnquiryModal({ isOpen, onClose, product = null, enquiryType = 'retail', selectedVariant = '', includeTrolley = false }) {
  const { t, lang } = useLanguage();
  const { submitEnquiry, settings } = useBusiness();

  const [trolleySelected, setTrolleySelected] = useState(includeTrolley);
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    quantity: '1',
    enquiry_type: enquiryType,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.customer_name.trim() || !formData.phone.trim()) {
      setError(t.contact.errorMsg);
      return;
    }

    setLoading(true);
    try {
      const fullProductName = [
        product?.name || 'General Inquiry',
        selectedVariant ? `[${selectedVariant}]` : '',
        trolleySelected ? '(+ Wheeled Trolley Base)' : ''
      ].filter(Boolean).join(' ');

      const result = await submitEnquiry({
        customer_name: formData.customer_name,
        phone: formData.phone,
        product_id: product?.id || null,
        product_name: fullProductName,
        quantity: formData.quantity,
        enquiry_type: formData.enquiry_type,
        message: formData.message + (trolleySelected ? '\n[Includes Wheeled Trolley Base Request]' : ''),
        status: 'new'
      });

      if (result.success) {
        setSuccess(true);
        try {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        } catch {}
      } else {
        setError(result.error || 'Failed to submit enquiry.');
      }
    } catch (err) {
      setError('An error occurred. Please contact via WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappLink = getWhatsAppLink({
    product,
    enquiryType: formData.enquiry_type,
    quantity: formData.quantity,
    variant: selectedVariant,
    includeTrolley: trolleySelected,
    customMessage: formData.message
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-cream w-full max-w-lg rounded-3xl border-2 border-carbon shadow-brutal-lg overflow-hidden p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-carbon/5 hover:bg-carbon text-carbon hover:text-cream transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 bg-whatsapp/20 text-whatsapp rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-display font-black text-2xl text-carbon">
              {t.contact.successMsg}
            </h3>
            <p className="text-sm text-carbon/70 max-w-sm mx-auto">
              {settings.owner} will review your request. For instant response, click below to open in WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-whatsapp text-white font-bold text-sm shadow-md hover:brightness-105 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Open in WhatsApp</span>
              </a>
              <button
                onClick={onClose}
                className="py-3 px-6 rounded-2xl bg-carbon text-cream font-bold text-sm hover:bg-carbon-light transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[11px] font-bold font-mono tracking-widest uppercase text-orange-electric block mb-1">
                {product ? `PRODUCT ENQUIRY • ${product.id}` : 'GENERAL ENQUIRY'}
              </span>
              <h2 className="font-display font-black text-2xl text-carbon">
                {product ? product.name : t.contact.formTitle}
              </h2>
              <p className="text-xs text-carbon/60 mt-1">
                {t.contact.formSubtitle}
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs font-semibold">
                {error}
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-bold text-carbon mb-1">
                  {t.contact.fullName}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-carbon/20 bg-white focus:outline-none focus:border-orange-electric focus:ring-1 focus:ring-orange-electric text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-carbon mb-1">
                    {t.contact.mobile}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-carbon/20 bg-white focus:outline-none focus:border-orange-electric focus:ring-1 focus:ring-orange-electric text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-carbon mb-1">
                    {t.contact.quantity}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1 piece / 20 bulk units"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-carbon/20 bg-white focus:outline-none focus:border-orange-electric focus:ring-1 focus:ring-orange-electric text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-carbon mb-1">
                  {t.contact.enquiryType}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, enquiry_type: 'retail' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      formData.enquiry_type === 'retail'
                        ? 'bg-carbon text-cream border-carbon'
                        : 'bg-white text-carbon/70 border-carbon/20 hover:border-carbon'
                    }`}
                  >
                    {t.contact.retailOption}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, enquiry_type: 'wholesale' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      formData.enquiry_type === 'wholesale'
                        ? 'bg-carbon text-cream border-carbon'
                        : 'bg-white text-carbon/70 border-carbon/20 hover:border-carbon'
                    }`}
                  >
                    {t.contact.wholesaleOption}
                  </button>
                </div>
              </div>

              {product?.hasTrolleyOption && (
                <div className="p-3 rounded-xl bg-orange-50 border border-orange-200">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={trolleySelected}
                      onChange={(e) => setTrolleySelected(e.target.checked)}
                      className="w-4 h-4 rounded border-carbon text-orange-electric focus:ring-orange-electric cursor-pointer"
                    />
                    <span className="text-xs font-bold text-carbon">
                      {t.productDetail.includeTrolleyCheck || 'Include Heavy-Duty Wheeled Trolley Base'}
                    </span>
                  </label>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-carbon mb-1">
                  {t.contact.message}
                </label>
                <textarea
                  rows="3"
                  placeholder="Mention custom size, delivery location, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-carbon/20 bg-white focus:outline-none focus:border-orange-electric focus:ring-1 focus:ring-orange-electric text-sm resize-none"
                ></textarea>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-5 rounded-2xl bg-orange-electric text-white font-bold text-xs uppercase tracking-wider hover:bg-orange-hover transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? t.contact.submitting : t.contact.submitBtn}</span>
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-2xl bg-whatsapp text-white font-bold text-xs uppercase tracking-wider hover:bg-[#20b858] transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="text-center pt-2 text-[11px] text-carbon/50">
              Direct Contact: {settings.owner} • {settings.phone}
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
