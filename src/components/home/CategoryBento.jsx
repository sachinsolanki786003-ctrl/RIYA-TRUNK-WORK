import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useBusiness } from '../../context/BusinessContext';
import { ArrowUpRight, Sparkles, Disc, CheckCircle2 } from 'lucide-react';
import ProductIllustration from '../ui/ProductIllustration';

export default function CategoryBento() {
  const { t, lang } = useLanguage();
  const { categories } = useBusiness();

  // Mapping category illustrations fallback
  const getCatIllustration = (id) => {
    switch (id) {
      case 'metal-storage-boxes': return 'svg-trunk-classic';
      case 'grain-storage-drums': return 'svg-drum-grain';
      case 'bedding-storage-trunks': return 'svg-trunk-jumbo';
      case 'stainless-steel-products': return 'svg-ss-box';
      case 'galvanized-products': default: return 'svg-gi-box';
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-electric"></span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-carbon/70">
                REAL PRODUCT CATEGORIES & INVENTORY
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-carbon tracking-tight uppercase">
              {t.categories.heading}
            </h2>
            <p className="text-sm sm:text-base text-carbon/70 mt-2 max-w-xl">
              {t.categories.subheading}
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-display font-bold text-sm text-carbon hover:text-orange-electric transition-colors group"
          >
            <span>{t.categories.viewAll}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid Layout featuring Real Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => {
            const name = lang === 'gu' ? cat.nameGu || cat.name : (lang === 'hi' ? cat.nameHi || cat.name : cat.name);
            const desc = lang === 'gu' ? cat.descriptionGu || cat.description : (lang === 'hi' ? cat.descriptionHi || cat.description : cat.description);
            const badge = lang === 'gu' ? cat.badgeGu || cat.badge : (lang === 'hi' ? cat.badgeHi || cat.badge : cat.badge);
            const realFeature = lang === 'gu' ? cat.realFeatureGu || cat.realFeature : cat.realFeature;
            const illustrationType = getCatIllustration(cat.id);

            // Prominent sizing for top category
            const isFirst = index === 0;

            return (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug || cat.id}`}
                className={`group relative rounded-3xl border-2 border-carbon bg-white p-6 sm:p-7 flex flex-col justify-between shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
                  isFirst ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white to-cream-light' : ''
                }`}
              >
                {/* Top Badge & Corner Arrow */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-cream-dark border border-carbon/20 font-mono text-[11px] font-bold text-carbon uppercase tracking-wider">
                      {badge || 'Premium Metal'}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified Shop Photo</span>
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-carbon text-cream flex items-center justify-center group-hover:bg-orange-electric group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Central Real Product Photograph on Pure White Studio Canvas */}
                <div className="my-5 py-2 flex items-center justify-center bg-white rounded-2xl border border-carbon/5 p-4 shadow-sm">
                  <div className={`w-full ${isFirst ? 'h-48 sm:h-56' : 'h-40 sm:h-44'} flex items-center justify-center overflow-hidden`}>
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={name}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
                        loading="lazy"
                      />
                    ) : (
                      <ProductIllustration type={illustrationType} />
                    )}
                  </div>
                </div>

                {/* Bottom Title, Specifications & Lamination/Trolley Highlight */}
                <div className="z-10 pt-2 border-t border-carbon/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-carbon group-hover:text-orange-electric transition-colors">
                      {name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-carbon/70 line-clamp-2 leading-relaxed font-sans">
                    {desc}
                  </p>

                  {/* Real Product Feature Tag (Lamination / Trolley) */}
                  {realFeature && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-950 font-mono text-[10px] font-bold">
                      <Disc className="w-3 h-3 text-orange-electric" />
                      <span>{realFeature}</span>
                    </div>
                  )}
                  
                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-carbon group-hover:text-orange-electric font-mono uppercase tracking-wider">
                    <span>{t.categories.exploreBtn}</span>
                    <span>View Models →</span>
                  </div>
                </div>

              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
