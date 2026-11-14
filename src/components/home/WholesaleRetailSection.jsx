import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useBusiness } from '../../context/BusinessContext';
import { Truck, ShoppingBag, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { getWhatsAppLink, getPhoneLink } from '../../lib/utils';
import EnquiryModal from '../products/EnquiryModal';

export default function WholesaleRetailSection() {
  const { t } = useLanguage();
  const { settings } = useBusiness();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeType, setActiveType] = useState('wholesale');

  const openEnquiry = (type) => {
    setActiveType(type);
    setModalOpen(true);
  };

  return (
    <section className="py-16 sm:py-24 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-electric text-white text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
            TWO MODES OF COMMERCE
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-carbon tracking-tight uppercase">
            {t.trade.heading}
          </h2>
          <p className="text-sm sm:text-base text-carbon/70 mt-2">
            {t.trade.subheading}
          </p>
        </div>

        {/* Two High-Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* WHOLESALE CARD */}
          <div className="relative rounded-3xl border-3 border-carbon bg-carbon text-cream p-8 sm:p-10 flex flex-col justify-between shadow-brutal hover:shadow-brutal-lg transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-orange-electric text-white flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs font-bold text-orange-electric uppercase tracking-widest px-3 py-1 rounded-full bg-orange-electric/15 border border-orange-electric/30">
                  BULK ORDERS
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                  {t.trade.wholesaleTitle}
                </h3>
                <p className="text-xs text-silver uppercase font-mono tracking-wider font-semibold mt-1">
                  {t.trade.wholesaleSubtitle}
                </p>
              </div>

              <p className="text-sm text-cream/80 leading-relaxed font-sans">
                {t.trade.wholesaleDesc}
              </p>

              <ul className="space-y-2 text-xs text-cream/70 pt-2 border-t border-cream/10">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-electric"></span>
                  <span>Volume tier discounts on grain drums and metal boxes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-electric"></span>
                  <span>Direct truck/tempo loading from Devraj Complex, Kathwada shop</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-electric"></span>
                  <span>Priority production for institutional buyers</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppLink({ enquiryType: 'wholesale' })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-orange-electric text-white font-display font-bold text-xs uppercase tracking-wider hover:bg-orange-hover transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{t.trade.wholesaleBtn}</span>
              </a>

              <button
                onClick={() => openEnquiry('wholesale')}
                className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-darkgrey text-cream border border-cream/20 font-display font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-carbon transition-colors"
              >
                <span>Submit Specs</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RETAIL CARD */}
          <div className="relative rounded-3xl border-3 border-carbon bg-white text-carbon p-8 sm:p-10 flex flex-col justify-between shadow-brutal hover:shadow-brutal-lg transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cream border-2 border-carbon text-carbon flex items-center justify-center shadow-brutal-sm">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs font-bold text-carbon uppercase tracking-widest px-3 py-1 rounded-full bg-cream-dark border border-carbon/20">
                  SINGLE PIECES
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-carbon tracking-tight uppercase">
                  {t.trade.retailTitle}
                </h3>
                <p className="text-xs text-carbon/60 uppercase font-mono tracking-wider font-semibold mt-1">
                  {t.trade.retailSubtitle}
                </p>
              </div>

              <p className="text-sm text-carbon/80 leading-relaxed font-sans">
                {t.trade.retailDesc}
              </p>

              <ul className="space-y-2 text-xs text-carbon/70 pt-2 border-t border-carbon/10">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-carbon"></span>
                  <span>Inspect trunks and drums in person before buying</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-carbon"></span>
                  <span>Instant carry-home or local tempo delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-carbon"></span>
                  <span>Transparent and honest pricing from Mohanbhai</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppLink({ enquiryType: 'retail' })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-whatsapp text-white font-display font-bold text-xs uppercase tracking-wider hover:bg-[#20b858] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{t.trade.retailBtn}</span>
              </a>

              <a
                href={getPhoneLink(settings.phone_raw || '919724832538')}
                className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-cream-light border-2 border-carbon text-carbon font-display font-bold text-xs uppercase tracking-wider hover:bg-carbon hover:text-cream transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-electric" />
                <span>Call Shop</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        enquiryType={activeType}
      />
    </section>
  );
}
