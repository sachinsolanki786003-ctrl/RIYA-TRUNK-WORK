import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useBusiness } from '../context/BusinessContext';
import ProductIllustration from '../components/ui/ProductIllustration';
import EnquiryModal from '../components/products/EnquiryModal';
import ProductCard from '../components/products/ProductCard';
import { 
  ArrowLeft, MessageCircle, Phone, ShieldCheck, Ruler, 
  Layers, Box, CheckCircle2, Share2, AlertCircle, Disc, Sparkles, Shield 
} from 'lucide-react';
import { getWhatsAppLink, getPhoneLink } from '../lib/utils';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { products, settings } = useBusiness();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQty, setSelectedQty] = useState('1');
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [includeTrolley, setIncludeTrolley] = useState(false);

  // Find product by slug or id
  const product = products.find(p => p.slug === id || p.id === id);

  if (!product) {
    return (
      <div className="py-24 bg-cream text-center px-4">
        <h2 className="font-display font-black text-3xl text-carbon">Product Not Found</h2>
        <p className="text-sm text-carbon/70 mt-2 mb-6">The storage item you are looking for is not listed or has been moved.</p>
        <Link to="/products" className="px-6 py-3 rounded-2xl bg-carbon text-cream font-bold text-xs uppercase tracking-wider">
          {t.productDetail.backToCatalog}
        </Link>
      </div>
    );
  }

  // Localized texts
  const name = lang === 'gu' ? product.nameGu || product.name : (lang === 'hi' ? product.nameHi || product.name : product.name);
  const material = lang === 'gu' ? product.materialGu || product.material : (lang === 'hi' ? product.materialHi || product.material : product.material);
  const description = lang === 'gu' ? product.fullDescriptionGu || product.fullDescription || product.description : (lang === 'hi' ? product.fullDescriptionHi || product.fullDescription || product.description : product.fullDescription || product.description);
  const capacity = lang === 'gu' ? product.capacityGu || product.capacity : (lang === 'hi' ? product.capacityHi || product.capacity : product.capacity);
  const priceDisplay = lang === 'gu' ? product.priceGu || product.price : (lang === 'hi' ? product.priceHi || product.price : product.price);
  const availability = lang === 'gu' ? product.availabilityGu || product.availability : (lang === 'hi' ? product.availabilityHi || product.availability : product.availability);

  // Variant resolution
  const hasVariants = product.variants && product.variants.length > 0;
  const currentVariant = hasVariants ? product.variants[selectedVariantIdx] : null;
  const currentImage = currentVariant ? currentVariant.image : (product.images && product.images[0] ? product.images[0] : null);

  const selectedVariantLabel = currentVariant 
    ? (lang === 'gu' ? currentVariant.labelGu || currentVariant.label : (lang === 'hi' ? currentVariant.labelHi || currentVariant.label : currentVariant.label))
    : '';

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category_id === product.category_id)
    .slice(0, 3);

  const whatsappUrl = getWhatsAppLink({ 
    product, 
    quantity: selectedQty,
    variant: selectedVariantLabel,
    includeTrolley
  });

  return (
    <div className="py-10 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-carbon/70 hover:text-orange-electric transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.productDetail.backToCatalog}</span>
          </Link>
        </div>

        {/* Main Product Showcase Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Image Canvas Gallery (6 Cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl border-3 border-carbon p-6 sm:p-8 shadow-brutal-lg flex flex-col justify-between overflow-hidden">
            
            <div className="flex items-center justify-between pb-4 border-b border-carbon/10">
              <span className="font-mono text-xs font-bold text-orange-electric uppercase tracking-wider">
                ITEM ID // {product.id}
              </span>
              <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-cream-dark border border-carbon/20 font-bold text-carbon">
                {product.categoryName || 'METAL STORAGE'}
              </span>
            </div>

            {/* Main Visual Display on Pure Studio White Background */}
            <div className="my-6 py-4 flex items-center justify-center min-h-[320px] sm:min-h-[380px] bg-white rounded-2xl">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={`${name} - ${selectedVariantLabel || 'Studio View'}`}
                  className="max-h-[380px] w-auto max-w-full object-contain drop-shadow-md transition-all duration-300"
                />
              ) : (
                <div className="w-full h-72 sm:h-80 flex items-center justify-center">
                  <ProductIllustration type={product.imageType || 'svg-trunk-classic'} accentColor={product.accentColor || '#FF6538'} />
                </div>
              )}
            </div>

            {/* Separate Images / Variant Switcher Gallery */}
            {hasVariants && (
              <div className="pt-4 border-t border-carbon/10 space-y-2">
                <div className="text-[11px] font-mono font-bold text-carbon/70 uppercase flex items-center justify-between">
                  <span>{t.productDetail.laminationSelector || 'Select Finish / View Variations:'}</span>
                  <span className="text-orange-electric">{selectedVariantLabel}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((v, idx) => {
                    const isSelected = selectedVariantIdx === idx;
                    const vLabel = lang === 'gu' ? v.labelGu || v.label : (lang === 'hi' ? v.labelHi || v.label : v.label);
                    return (
                      <button
                        key={v.id || idx}
                        onClick={() => setSelectedVariantIdx(idx)}
                        className={`p-2.5 rounded-2xl border-2 transition-all flex items-center gap-3 text-left ${
                          isSelected
                            ? 'border-carbon bg-cream shadow-brutal-sm'
                            : 'border-carbon/20 bg-cream-light hover:border-carbon/60'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-white border border-carbon/20 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                          <img src={v.image} alt={vLabel} className="w-full h-full object-contain" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="font-bold text-xs text-carbon truncate">{vLabel}</div>
                          <div className="text-[10px] text-carbon/60 font-mono mt-0.5">
                            {v.id === 'without-lamination' ? '✨ Pure Mirror' : '🛡️ Protective Film'}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Badges Bar */}
            <div className="pt-4 mt-4 border-t border-carbon/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="inline-flex items-center gap-1 font-bold text-carbon">
                <CheckCircle2 className="w-4 h-4 text-orange-electric" />
                <span>{availability || 'Available at Shop No. 6'}</span>
              </span>
              <span className="text-carbon/60 font-mono text-[11px]">
                Workshop: Devabhai Estate
              </span>
            </div>

          </div>

          {/* Right Column: Specifications & Enquiry Actions (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-white rounded-3xl border-3 border-carbon p-6 sm:p-8 shadow-brutal space-y-6">
              
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-electric block mb-1">
                  {product.categoryName || 'PREMIUM METAL PRODUCT'}
                </span>
                <h1 className="font-display font-black text-3xl sm:text-4xl text-carbon leading-tight">
                  {name}
                </h1>
                <p className="text-sm font-semibold text-carbon/60 mt-1">
                  Manufacturer: RIYA TRUNK WORK ({settings.owner})
                </p>
              </div>

              {/* Price Display */}
              <div className="p-4 rounded-2xl bg-cream border border-carbon/15 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-carbon/60 uppercase block font-semibold">
                    {t.productDetail.price}
                  </span>
                  <span className="font-display font-black text-xl text-carbon">
                    {priceDisplay || t.featured.contactForPrice}
                  </span>
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-carbon text-cream font-bold">
                  Wholesale & Retail
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-carbon/80 leading-relaxed font-sans">
                {description}
              </p>

              {/* Specs Bento Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                {material && (
                  <div className="p-3 rounded-xl bg-cream-light border border-carbon/10">
                    <div className="text-[10px] font-mono font-bold text-carbon/50 uppercase flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-orange-electric" /> {t.productDetail.material}
                    </div>
                    <div className="font-bold text-carbon mt-1 truncate" title={material}>{material}</div>
                  </div>
                )}

                {product.dimensions && (
                  <div className="p-3 rounded-xl bg-cream-light border border-carbon/10">
                    <div className="text-[10px] font-mono font-bold text-carbon/50 uppercase flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5 text-orange-electric" /> {t.productDetail.dimensions}
                    </div>
                    <div className="font-bold text-carbon mt-1 truncate" title={product.dimensions}>{product.dimensions}</div>
                  </div>
                )}

                {capacity && (
                  <div className="p-3 rounded-xl bg-cream-light border border-carbon/10 col-span-1 sm:col-span-2">
                    <div className="text-[10px] font-mono font-bold text-carbon/50 uppercase flex items-center gap-1">
                      <Box className="w-3.5 h-3.5 text-orange-electric" /> {t.productDetail.capacity}
                    </div>
                    <div className="font-bold text-carbon mt-1">{capacity}</div>
                  </div>
                )}

              </div>

              {/* Trolley Feature Add-on Card */}
              {product.hasTrolleyOption && (
                <div className="p-4 rounded-2xl bg-orange-50/80 border-2 border-orange-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Disc className="w-4 h-4 text-orange-electric animate-spin-slow" />
                      <span className="font-display font-extrabold text-xs text-orange-950 uppercase tracking-wide">
                        {t.productDetail.trolleyHeading || 'Heavy-Duty Wheeled Trolley Base'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-orange-electric text-white">
                      ADD-ON
                    </span>
                  </div>

                  <p className="text-xs text-orange-900/80 leading-relaxed font-sans">
                    {t.productDetail.trolleyBenefit || 'Specially fabricated rolling trolley base with 360° castor wheels allowing effortless movement of heavy trunks and grain drums for floor sweeping and cleaning.'}
                  </p>

                  <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={includeTrolley}
                      onChange={(e) => setIncludeTrolley(e.target.checked)}
                      className="w-4 h-4 rounded border-carbon text-orange-electric focus:ring-orange-electric cursor-pointer"
                    />
                    <span className="text-xs font-bold text-carbon">
                      {t.productDetail.includeTrolleyCheck || 'Include Wheeled Trolley Base (+ Movable Trolley)'}
                    </span>
                  </label>
                </div>
              )}

              {/* Quantity Selector & CTAs */}
              <div className="space-y-4 pt-2 border-t border-carbon/10">
                
                <div className="flex items-center gap-3">
                  <label htmlFor="qty-select" className="text-xs font-bold text-carbon whitespace-nowrap">
                    Quantity:
                  </label>
                  <select
                    id="qty-select"
                    value={selectedQty}
                    onChange={(e) => setSelectedQty(e.target.value)}
                    className="py-2 px-3 rounded-xl border border-carbon/20 bg-cream-light text-xs font-bold text-carbon focus:outline-none focus:border-orange-electric"
                  >
                    <option value="1">1 Piece (Retail)</option>
                    <option value="2-5">2 to 5 Pieces</option>
                    <option value="10-25">10 to 25 Pieces (Wholesale)</option>
                    <option value="50+">50+ Bulk Batch (Trader)</option>
                  </select>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-4 px-5 rounded-2xl bg-whatsapp text-white font-display font-bold text-xs uppercase tracking-wider hover:bg-[#20b858] transition-all shadow-md text-center"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{t.productDetail.quickEnquiry}</span>
                  </a>

                  <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 py-4 px-5 rounded-2xl bg-carbon text-cream font-display font-bold text-xs uppercase tracking-wider hover:bg-orange-electric hover:text-white transition-all text-center shadow-brutal-sm"
                  >
                    <span>Send Online Enquiry</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 text-xs text-carbon/70 pt-1">
                  <span>Or call directly:</span>
                  <a href={getPhoneLink(settings.phone_raw || '919724832538')} className="font-bold text-carbon hover:text-orange-electric flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-orange-electric" /> {settings.phone}
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Technical Specifications Section if available */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="bg-white rounded-3xl border-2 border-carbon p-6 sm:p-8 mb-16 shadow-brutal">
            <h3 className="font-display font-black text-2xl text-carbon uppercase mb-4">
              {t.productDetail.specifications}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((spec, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-cream border border-carbon/10 text-xs">
                  <span className="font-mono text-carbon/60 font-semibold">{spec.key}</span>
                  <span className="font-bold text-carbon">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="mb-6">
              <h3 className="font-display font-black text-2xl sm:text-3xl text-carbon uppercase">
                {t.productDetail.relatedTitle}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
        selectedVariant={selectedVariantLabel}
        includeTrolley={includeTrolley}
      />
    </div>
  );
}
