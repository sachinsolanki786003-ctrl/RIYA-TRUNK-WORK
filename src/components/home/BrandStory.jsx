import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useBusiness } from '../../context/BusinessContext';
import { ShieldCheck, MapPin, Award, CheckCircle2 } from 'lucide-react';

export default function BrandStory() {
  const { t, lang } = useLanguage();
  const { settings } = useBusiness();

  const brandName = lang === 'gu' ? settings.nameGu || 'રિયા ટ્રંક વર્ક' : settings.name;

  return (
    <section className="py-16 sm:py-24 bg-carbon text-cream relative overflow-hidden">
      
      {/* Subtle Grid Accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#F5F0E8_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Story Editorial Typography (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-electric"></span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-silver">
                AUTHENTIC AHMEDABAD METAL WORKSHOP
              </span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] uppercase">
              {t.story.heading}
            </h2>

            <p className="text-lg text-orange-electric font-medium">
              {t.story.subheading}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-cream/75 leading-relaxed font-sans">
              <p>{t.story.p1}</p>
              <p>{t.story.p2}</p>
            </div>

            {/* Verified Owner & Location Card */}
            <div className="p-5 rounded-2xl bg-darkgrey border border-cream/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs text-silver uppercase font-mono tracking-wider font-semibold">
                  {t.story.ownerLabel}
                </div>
                <div className="font-display font-bold text-white text-lg">
                  {settings.owner}
                </div>
                <div className="text-xs text-cream/70 flex items-center gap-1.5 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-electric" />
                  <span>{settings.address}</span>
                </div>
              </div>

              <div className="px-3.5 py-1.5 rounded-lg bg-orange-electric/20 border border-orange-electric/40 text-orange-electric text-xs font-bold uppercase font-mono">
                {t.brand.wholesaleRetailTag}
              </div>
            </div>

          </div>

          {/* Right Column: Industrial Specs & Verification Bento (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Bento Card 1: Verified Material Standard */}
            <div className="p-6 rounded-3xl bg-darkgrey border-2 border-cream/15 shadow-brutal space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-orange-electric/20 text-orange-electric flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] text-silver font-bold uppercase">GRADE // HIGH GAUGE</span>
              </div>
              <h4 className="font-display font-bold text-lg text-white">
                CRC Steel & Hot-Dip Galvanized
              </h4>
              <p className="text-xs text-cream/70 leading-relaxed">
                Fabricated with authentic high-tensile metal sheets for structural rigidity, impact resistance, and maximum grain preservation.
              </p>
            </div>

            {/* Bento Card 2: Wholesale & Retail Reach */}
            <div className="p-6 rounded-3xl bg-darkgrey border-2 border-cream/15 shadow-brutal space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-whatsapp/20 text-whatsapp flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] text-silver font-bold uppercase">SUPPLY NETWORK</span>
              </div>
              <h4 className="font-display font-bold text-lg text-white">
                Shop No. 6, Devabhai Estate, Thakkarbapanagar
              </h4>
              <p className="text-xs text-cream/70 leading-relaxed">
                Conveniently accessible in Ahmedabad with on-spot loading for trucks, tempos, and direct personal customer vehicles.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
