import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useBusiness } from '../../context/BusinessContext';
import ProductCard from '../products/ProductCard';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturedProducts() {
  const { t } = useLanguage();
  const { products } = useBusiness();

  // Filter published products, prioritizing featured ones
  const publishedProducts = products.filter(p => p.published !== false);
  const featured = publishedProducts.filter(p => p.featured);
  const displayProducts = (featured.length > 0 ? featured : publishedProducts).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-white border-y-2 border-carbon relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-electric"></span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-carbon/70">
                VERIFIED INVENTORY
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-carbon tracking-tight uppercase">
              {t.featured.heading}
            </h2>
            <p className="text-sm sm:text-base text-carbon/70 mt-2 max-w-xl">
              {t.featured.subheading}
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner note about verified inventory and custom orders */}
        <div className="mt-12 p-6 rounded-2xl bg-cream border-2 border-carbon flex flex-col sm:flex-row items-center justify-between gap-4 shadow-brutal-sm">
          <div>
            <p className="font-display font-bold text-carbon text-base">
              Need custom dimensions or bulk wholesale quantity?
            </p>
            <p className="text-xs text-carbon/70 mt-0.5">
              We fabricate custom metal storage boxes and grain drums tailored to your room or commercial requirements.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 px-6 py-2.5 rounded-xl bg-carbon text-cream font-bold text-xs uppercase tracking-wider hover:bg-orange-electric hover:text-white transition-colors"
          >
            Request Custom Quote
          </Link>
        </div>

      </div>
    </section>
  );
}
