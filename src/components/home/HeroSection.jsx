import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useBusiness } from '../../context/BusinessContext';
import { ArrowUpRight, MessageCircle, Phone, ShieldCheck, Sparkles, Box, CheckCircle } from 'lucide-react';
import { getWhatsAppLink, getPhoneLink } from '../../lib/utils';
import ProductIllustration from '../ui/ProductIllustration';

export default function HeroSection() {
  const { t, lang } = useLanguage();
  const { settings } = useBusiness();

  const brandTitle = lang === 'gu' ? settings.nameGu || 'રિયા ટ્રંક વર્ક' : settings.name;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b-2 border-carbon">
      
      {/* Background Decorative Tech Lines / Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#151515_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-carbon text-cream text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-electric animate-ping"></span>
            {t.hero.eyebrow}
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-cream-dark border border-carbon/20 text-carbon text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-electric" />
            {t.hero.badgeEst}
          </span>
        </div>

        {/* Main Hero Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Massive Headlines & CTAs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-1">
              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-carbon leading-[0.92] uppercase">
                <span>{t.hero.titleLine1}</span><br />
                <span className="text-orange-electric">{t.hero.titleLine2}</span><br />
                <span className="inline-block relative">
                  {t.hero.titleLine3}
                  <span className="absolute -bottom-2 left-0 w-full h-3 bg-orange-electric/30 -z-10 rounded"></span>
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-xl text-carbon/80 max-w-xl font-sans leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-2xl bg-carbon text-cream font-display font-bold text-sm uppercase tracking-wider hover:bg-orange-electric hover:text-white transition-all duration-300 shadow-brutal hover:shadow-brutal-orange hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t.hero.ctaExplore}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-whatsapp text-white font-display font-bold text-sm uppercase tracking-wider hover:bg-[#20b858] transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{t.hero.ctaWhatsapp}</span>
              </a>

              <a
                href={getPhoneLink(settings.phone_raw || '919724832538')}
                className="inline-flex items-center justify-center gap-2 py-4 px-5 rounded-2xl bg-white border-2 border-carbon text-carbon font-display font-bold text-sm uppercase tracking-wider hover:bg-cream-dark transition-all"
              >
                <Phone className="w-4 h-4 text-orange-electric" />
                <span>{t.hero.ctaTalk}</span>
              </a>
            </div>

            {/* Quick Trust Highlights */}
            <div className="pt-6 border-t border-carbon/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-carbon/75">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-electric shrink-0" />
                <span>{settings.businessType}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-electric shrink-0" />
                <span>Devabhai Estate, Ahmedabad</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle className="w-4 h-4 text-orange-electric shrink-0" />
                <span>Direct Workshop Rates</span>
              </div>
            </div>

          </div>

          {/* Right Column: Gen Z Industrial Showcase Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-3xl border-3 border-carbon p-6 shadow-brutal-lg overflow-hidden group">
              
              {/* Header inside Card */}
              <div className="flex items-center justify-between pb-4 border-b border-carbon/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-electric"></span>
                  <span className="font-mono text-xs font-bold text-carbon uppercase tracking-wider">
                    SPEC // RTW-HEAVY-01
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cream-dark border border-carbon/20 font-bold">
                  MADE IN GUJARAT
                </span>
              </div>

              {/* Central Graphic */}
              <div className="py-4 my-2 flex items-center justify-center">
                <ProductIllustration type="svg-trunk-classic" className="w-full h-56 transition-transform duration-500 group-hover:scale-105" />
              </div>

              {/* Bottom Feature Pill Grid */}
              <div className="bg-cream-light p-4 rounded-2xl border border-carbon/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-carbon/60 font-medium">{t.story.ownerLabel}</span>
                  <span className="font-bold text-carbon">{settings.owner}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-carbon/60 font-medium">Location:</span>
                  <span className="font-bold text-carbon truncate max-w-[200px]" title={settings.address}>
                    Shop No. 6, Devabhai Estate
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-carbon/10">
                  <span className="text-orange-electric font-bold">Gujarati Name:</span>
                  <span className="font-bold text-carbon">{settings.nameGu || 'રિયા ટ્રંક વર્ક'}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
