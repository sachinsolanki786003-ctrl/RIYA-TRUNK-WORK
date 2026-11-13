import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useBusiness } from '../../context/BusinessContext';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, Navigation } from 'lucide-react';
import { getWhatsAppLink, getPhoneLink } from '../../lib/utils';

export default function VisitShopMap() {
  const { t, lang } = useLanguage();
  const { settings } = useBusiness();

  const brandName = lang === 'gu' ? settings.nameGu || 'રિયા ટ્રંક વર્ક' : settings.name;

  return (
    <section className="py-16 sm:py-24 bg-white border-t-2 border-carbon relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-electric"></span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-carbon/70">
                PHYSICAL STORE & WORKSHOP
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-carbon tracking-tight uppercase">
              {t.contact.heading}
            </h2>
            <p className="text-sm sm:text-base text-carbon/70 mt-2 max-w-xl">
              {t.contact.subheading}
            </p>
          </div>

          <a
            href={settings.mapsDirectionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl bg-carbon text-cream font-bold text-xs uppercase tracking-wider hover:bg-orange-electric hover:text-white transition-colors"
          >
            <Navigation className="w-4 h-4 text-orange-electric" />
            <span>{t.contact.getDirections}</span>
          </a>
        </div>

        {/* 2-Column Storefront Details & Map View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Details Card (5 Cols) */}
          <div className="lg:col-span-5 bg-cream rounded-3xl border-2 border-carbon p-6 sm:p-8 flex flex-col justify-between shadow-brutal">
            
            <div className="space-y-6">
              
              <div>
                <span className="font-mono text-[11px] font-bold text-orange-electric uppercase tracking-widest block mb-1">
                  OFFICIAL LOCATION
                </span>
                <h3 className="font-display font-black text-2xl text-carbon">
                  {settings.name}
                </h3>
                <p className="text-sm font-semibold text-carbon/70">
                  {brandName}
                </p>
              </div>

              {/* Verified Owner & Address */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-carbon/15">
                  <MapPin className="w-5 h-5 text-orange-electric shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold font-mono text-carbon/50 uppercase">ADDRESS</div>
                    <div className="font-bold text-carbon text-sm mt-0.5">{settings.address}</div>
                    <div className="text-xs text-carbon/70 mt-0.5">Ahmedabad, Gujarat – 382340</div>
                    <div className="inline-flex items-center gap-1 font-mono text-[10px] text-orange-electric font-bold mt-1 px-2 py-0.5 rounded bg-orange-50 border border-orange-200">
                      <span>GPS: 23.040066, 72.642030</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-carbon/15">
                  <Clock className="w-5 h-5 text-orange-electric shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold font-mono text-carbon/50 uppercase">SHOP TIMINGS</div>
                    <div className="font-bold text-carbon text-sm mt-0.5">{settings.timings}</div>
                    <div className="text-xs text-carbon/70 mt-0.5">Contact Mohanbhai P. Chauhan for holiday timings</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Direct Connect Buttons */}
            <div className="pt-6 border-t border-carbon/15 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-whatsapp text-white font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all text-center shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Chat</span>
              </a>

              <a
                href={getPhoneLink(settings.phone_raw || '919724832538')}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-carbon text-cream font-bold text-xs uppercase tracking-wider hover:bg-carbon-light transition-all text-center"
              >
                <Phone className="w-4 h-4 text-orange-electric" />
                <span>Call Shop</span>
              </a>
            </div>

          </div>

          {/* Right Map View (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl border-2 border-carbon overflow-hidden shadow-brutal min-h-[350px] relative bg-cream-dark">
            <iframe
              title="RIYA TRUNK WORK Location at Devabhai Estate Ahmedabad"
              src={settings.mapEmbedUrl}
              className="w-full h-full min-h-[380px] border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="absolute bottom-4 left-4 right-4 bg-carbon/95 text-cream p-3 rounded-2xl border border-cream/20 flex items-center justify-between text-xs backdrop-blur-sm">
              <div className="truncate pr-2">
                <span className="font-bold text-white">Shop No. 6, Devabhai Estate</span>
                <span className="hidden sm:inline text-cream/70"> • Ahmedabad, Gujarat 382340</span>
              </div>
              <a
                href={settings.mapsDirectionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-3 py-1.5 rounded-lg bg-orange-electric text-white font-bold text-[11px] uppercase tracking-wider hover:bg-orange-hover transition-colors flex items-center gap-1"
              >
                <span>Navigate</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
