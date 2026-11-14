import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBusiness } from '../context/BusinessContext';
import { ShieldCheck, MapPin, Phone, MessageCircle, Layers, CheckCircle2 } from 'lucide-react';
import { getWhatsAppLink, getPhoneLink } from '../lib/utils';
import ProductIllustration from '../components/ui/ProductIllustration';

export default function AboutPage() {
  const { t, lang } = useLanguage();
  const { settings } = useBusiness();

  const brandName = lang === 'gu' ? settings.nameGu || 'રિયા ટ્રંક વર્ક' : settings.name;

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Hero Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-carbon text-cream text-[10px] font-mono font-bold uppercase tracking-widest mb-4">
            {t.about.tag}
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-carbon tracking-tight uppercase leading-tight">
            {t.about.title}
          </h1>
          <p className="text-xl text-orange-electric font-semibold mt-3">
            {t.about.subtitle}
          </p>
        </div>

        {/* 2-Column Editorial Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 bg-white rounded-3xl border-3 border-carbon p-8 sm:p-10 shadow-brutal space-y-6">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-carbon uppercase">
              {t.about.storyHeading}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-carbon/80 leading-relaxed font-sans">
              <p>{t.about.storyBody1}</p>
              <p>{t.about.storyBody2}</p>
              <p>{t.about.storyBody3}</p>
            </div>

            {/* Business Verification Card */}
            <div className="pt-6 border-t border-carbon/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-cream border border-carbon/15">
                <span className="font-mono text-[10px] text-carbon/50 uppercase font-bold block">PROPRIETOR</span>
                <span className="font-bold text-carbon text-sm mt-0.5 block">{settings.owner}</span>
                <span className="text-carbon/60 text-[11px] block mt-0.5">{brandName}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-cream border border-carbon/15">
                <span className="font-mono text-[10px] text-carbon/50 uppercase font-bold block">COMMERCIAL FACILITY</span>
                <span className="font-bold text-carbon text-sm mt-0.5 block">{settings.address || 'Shop No. 6, Devraj Complex, Kathwada'}</span>
                <span className="text-carbon/60 text-[11px] block mt-0.5">Ahmedabad, Gujarat – 382330</span>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3 px-5 rounded-2xl bg-whatsapp text-white font-bold text-xs uppercase tracking-wider hover:bg-[#20b858] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={getPhoneLink(settings.phone_raw || '919724832538')}
                className="inline-flex items-center gap-2 py-3 px-5 rounded-2xl bg-carbon text-cream font-bold text-xs uppercase tracking-wider hover:bg-carbon-light transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-electric" />
                <span>Call Mohanbhai: {settings.phone}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-carbon rounded-3xl border-3 border-carbon p-8 text-cream shadow-brutal-lg flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-electric"></span>
                <span className="font-mono text-xs font-bold text-silver uppercase">THE INDUSTRIAL STANDARD</span>
              </div>
              <h3 className="font-display font-black text-2xl text-white">
                PRECISION METAL CRAFT
              </h3>
            </div>

            <div className="py-2 bg-white/10 rounded-2xl p-4 flex items-center justify-center">
              <img
                src="/images/products/trunk-horizontal-without-lamination-studio.jpg"
                alt="RIYA TRUNK WORK Precision Metal Craft"
                className="w-full h-48 object-contain drop-shadow-md"
              />
            </div>

            <div className="p-4 rounded-2xl bg-darkgrey border border-cream/15 text-xs text-cream/70 space-y-1.5">
              <div className="font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-electric" />
                <span>Wholesale & Retail Supplier</span>
              </div>
              <p>Supply capability ranging from individual home storage trunks to bulk consignments for traders across Gujarat.</p>
            </div>
          </div>

        </div>

        {/* Materials Breakdown Section */}
        <div className="bg-white rounded-3xl border-2 border-carbon p-8 sm:p-12 shadow-brutal space-y-8">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-orange-electric">
              METALLURGICAL RIGOR
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-carbon uppercase mt-1">
              {t.about.materialsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-cream border border-carbon/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-carbon text-cream flex items-center justify-center font-bold font-mono text-xs">
                SS
              </div>
              <h3 className="font-display font-bold text-lg text-carbon">
                {t.about.m1Title}
              </h3>
              <p className="text-xs text-carbon/70 leading-relaxed">
                {t.about.m1Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cream border border-carbon/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-electric text-white flex items-center justify-center font-bold font-mono text-xs">
                GI
              </div>
              <h3 className="font-display font-bold text-lg text-carbon">
                {t.about.m2Title}
              </h3>
              <p className="text-xs text-carbon/70 leading-relaxed">
                {t.about.m2Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cream border border-carbon/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-darkgrey text-cream flex items-center justify-center font-bold font-mono text-xs">
                CRC
              </div>
              <h3 className="font-display font-bold text-lg text-carbon">
                {t.about.m3Title}
              </h3>
              <p className="text-xs text-carbon/70 leading-relaxed">
                {t.about.m3Desc}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
