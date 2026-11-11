import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Users, Sliders, PhoneCall } from 'lucide-react';

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const icons = [ShieldCheck, Users, Sliders, PhoneCall];

  return (
    <section className="py-16 sm:py-24 bg-cream border-b-2 border-carbon">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-carbon text-cream text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
            TRUST & VALUE PROPOSITION
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-carbon tracking-tight uppercase">
            {t.whyUs.heading}
          </h2>
          <p className="text-sm sm:text-base text-carbon/70 mt-2">
            {t.whyUs.subheading}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.whyUs.points.map((point, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={index}
                className="bg-white rounded-3xl border-2 border-carbon p-6 shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cream border-2 border-carbon flex items-center justify-center text-orange-electric mb-5 shadow-brutal-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-carbon mb-2">
                    {point.title}
                  </h3>
                  <p className="text-xs text-carbon/70 leading-relaxed font-sans">
                    {point.desc}
                  </p>
                </div>
                
                <div className="pt-4 mt-4 border-t border-carbon/10 flex items-center justify-between text-[11px] font-mono text-carbon/50">
                  <span>PILLAR 0{index + 1}</span>
                  <span className="text-orange-electric font-bold">VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
