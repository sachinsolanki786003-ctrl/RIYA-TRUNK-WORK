import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { MessageCircle, ArrowRight, Layers, Ruler, Box, Check, Sparkles, Shield, Disc } from 'lucide-react';
import { getWhatsAppLink } from '../../lib/utils';
import ProductIllustration from '../ui/ProductIllustration';

export default function ProductCard({ product }) {
  const { t, lang } = useLanguage();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  // Localized fields
  const name = lang === 'gu' ? product.nameGu || product.name : (lang === 'hi' ? product.nameHi || product.name : product.name);
  const material = lang === 'gu' ? product.materialGu || product.material : (lang === 'hi' ? product.materialHi || product.material : product.material);
  const description = lang === 'gu' ? product.shortDescriptionGu || product.shortDescription || product.description : (lang === 'hi' ? product.shortDescriptionHi || product.shortDescription || product.description : product.shortDescription || product.description);
  const priceDisplay = lang === 'gu' ? product.priceGu || product.price : (lang === 'hi' ? product.priceHi || product.price : product.price);
  const availability = lang === 'gu' ? product.availabilityGu || product.availability : (lang === 'hi' ? product.availabilityHi || product.availability : product.availability);

  // Variant resolution
  const hasVariants = product.variants && product.variants.length > 0;
  const currentVariant = hasVariants ? product.variants[selectedVariantIdx] : null;
  const currentImage = currentVariant ? currentVariant.image : (product.images && product.images[0] ? product.images[0] : null);

  const selectedVariantLabel = currentVariant 
    ? (lang === 'gu' ? currentVariant.labelGu || currentVariant.label : (lang === 'hi' ? currentVariant.labelHi || currentVariant.label : currentVariant.label))
    : '';

  const whatsappUrl = getWhatsAppLink({ 
    product, 
    variant: selectedVariantLabel,
    includeTrolley: product.hasTrolleyOption 
  });

  return (
    <div className="group bg-white rounded-2xl border-2 border-carbon overflow-hidden flex flex-col justify-between shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all duration-300">
      
      {/* Product Image / Illustration Canvas */}
      <div className="relative bg-white p-4 border-b-2 border-carbon aspect-[4/3] flex items-center justify-center overflow-hidden">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
          {product.featured && (
            <span className="px-2.5 py-0.5 rounded-md bg-orange-electric text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Featured
            </span>
          )}
          {availability && (
            <span className="px-2.5 py-0.5 rounded-md bg-carbon text-cream font-mono text-[10px] font-semibold tracking-wider">
              {availability}
            </span>
          )}
        </div>

        {/* Product Visual */}
        {currentImage ? (
          <img
            src={currentImage}
            alt={`${name} - ${selectedVariantLabel || 'Studio View'}`}
            className="w-full h-full object-contain p-2 rounded-lg group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <ProductIllustration type={product.imageType || 'svg-trunk-classic'} accentColor={product.accentColor || '#FF6538'} />
          </div>
        )}

        <div className="absolute bottom-2 right-3 font-mono text-[10px] text-carbon/40 uppercase">
          {product.id}
        </div>
      </div>

      {/* Lamination Finish Selector Pills if available */}
      {hasVariants && (
        <div className="bg-cream-dark/60 px-4 py-2 border-b border-carbon/10 flex items-center justify-between gap-1">
          <span className="text-[10px] font-mono font-bold text-carbon/60 uppercase">Finish:</span>
          <div className="flex items-center gap-1">
            {product.variants.map((v, idx) => {
              const isSelected = selectedVariantIdx === idx;
              const vLabel = lang === 'gu' ? v.labelGu || v.label : (lang === 'hi' ? v.labelHi || v.label : v.label);
              return (
                <button
                  key={v.id || idx}
                  onClick={() => setSelectedVariantIdx(idx)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono transition-all ${
                    isSelected
                      ? 'bg-carbon text-cream shadow-sm'
                      : 'bg-white text-carbon/70 hover:bg-cream border border-carbon/20'
                  }`}
                  title={vLabel}
                >
                  {v.id === 'without-lamination' ? '✨ No Film' : '🛡️ Film'}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Product Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Category Tag */}
          <div className="text-[11px] font-bold font-mono tracking-wider text-orange-electric uppercase mb-1">
            {product.categoryName || 'METAL STORAGE'}
          </div>

          {/* Product Name */}
          <h3 className="font-display font-extrabold text-lg text-carbon group-hover:text-orange-electric transition-colors line-clamp-1">
            <Link to={`/products/${product.slug || product.id}`}>
              {name}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs text-carbon/70 line-clamp-2 mt-2 leading-relaxed font-sans">
            {description}
          </p>

          {/* Trolley Feature Callout if available */}
          {product.hasTrolleyOption && (
            <div className="mt-2.5 p-2 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center gap-2 text-[11px] text-orange-950">
              <Disc className="w-3.5 h-3.5 text-orange-electric shrink-0 animate-spin-slow" />
              <span className="font-semibold truncate">
                {t.featured.trolleyAvailable || 'Movable Wheeled Trolley Base Available'}
              </span>
            </div>
          )}

          {/* Specs Mini Bento */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-carbon/10 text-[11px]">
            {material && (
              <div className="flex items-center gap-1.5 text-carbon/80 truncate">
                <Layers className="w-3.5 h-3.5 text-orange-electric shrink-0" />
                <span className="truncate" title={material}>{material}</span>
              </div>
            )}
            {product.dimensions && (
              <div className="flex items-center gap-1.5 text-carbon/80 truncate">
                <Ruler className="w-3.5 h-3.5 text-orange-electric shrink-0" />
                <span className="truncate" title={product.dimensions}>{product.dimensions}</span>
              </div>
            )}
            {product.capacity && (
              <div className="flex items-center gap-1.5 text-carbon/80 truncate col-span-2">
                <Box className="w-3.5 h-3.5 text-orange-electric shrink-0" />
                <span className="truncate" title={product.capacity}>{product.capacity}</span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-carbon/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs text-carbon/60 font-medium">
              {t.featured.specMaterial}:
            </div>
            <div className="text-xs font-bold text-carbon">
              {priceDisplay || t.featured.contactForPrice}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/products/${product.slug || product.id}`}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-cream-light border border-carbon text-carbon text-xs font-bold hover:bg-carbon hover:text-cream transition-colors text-center"
            >
              <span>{t.featured.viewDetails}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-whatsapp text-white text-xs font-bold hover:bg-[#20b858] transition-colors text-center shadow-sm"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
