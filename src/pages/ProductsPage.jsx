import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useBusiness } from '../context/BusinessContext';
import ProductCard from '../components/products/ProductCard';
import { Search, Filter, SlidersHorizontal, RotateCcw, AlertCircle } from 'lucide-react';

export default function ProductsPage() {
  const { t, lang } = useLanguage();
  const { products, categories } = useBusiness();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Handle Category selection
  const handleCategoryChange = (catSlug) => {
    if (catSlug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catSlug);
    }
    setSearchParams(searchParams);
  };

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    let result = products.filter(p => p.published !== false);

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => 
        p.category_id === selectedCategory || 
        p.categorySlug === selectedCategory ||
        (p.category_ids && p.category_ids.includes(selectedCategory)) ||
        p.categoryName?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => {
        const name = (p.name || '').toLowerCase();
        const nameGu = (p.nameGu || '').toLowerCase();
        const nameHi = (p.nameHi || '').toLowerCase();
        const material = (p.material || '').toLowerCase();
        const desc = (p.shortDescription || p.description || '').toLowerCase();
        return name.includes(q) || nameGu.includes(q) || nameHi.includes(q) || material.includes(q) || desc.includes(q);
      });
    }

    // Sorting
    if (sortBy === 'name-asc') {
      result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    } else if (sortBy === 'featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSortBy('featured');
    handleCategoryChange('all');
  };

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-carbon text-cream text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
            CATALOGUE // {filteredProducts.length} ITEMS
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-carbon tracking-tight uppercase">
            {t.catalog.title}
          </h1>
          <p className="text-sm sm:text-base text-carbon/70 mt-2 max-w-2xl">
            {t.catalog.subtitle}
          </p>
        </div>

        {/* Search, Filter & Sort Controls Bento Bar */}
        <div className="bg-white rounded-3xl border-2 border-carbon p-4 sm:p-6 mb-10 shadow-brutal space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input (8 cols on desktop) */}
            <div className="md:col-span-8 relative">
              <Search className="w-5 h-5 text-carbon/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.catalog.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-carbon/20 bg-cream-light text-carbon font-sans text-sm focus:outline-none focus:border-orange-electric focus:ring-1 focus:ring-orange-electric"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-carbon/50 hover:text-carbon"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Selector (4 cols on desktop) */}
            <div className="md:col-span-4 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-carbon/60 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-3 px-4 rounded-2xl border border-carbon/20 bg-cream-light text-carbon font-sans text-sm font-semibold focus:outline-none focus:border-orange-electric"
              >
                <option value="featured">{t.catalog.sortDefault}</option>
                <option value="name-asc">{t.catalog.sortNameAsc}</option>
                <option value="name-desc">{t.catalog.sortNameDesc}</option>
              </select>
            </div>

          </div>

          {/* Category Filter Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-carbon/10">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold font-mono tracking-wider transition-all uppercase ${
                selectedCategory === 'all'
                  ? 'bg-carbon text-cream shadow-sm'
                  : 'bg-cream text-carbon/80 border border-carbon/15 hover:border-carbon'
              }`}
            >
              {t.catalog.allFilter}
            </button>

            {categories.map((cat) => {
              const catName = lang === 'gu' ? cat.nameGu || cat.name : (lang === 'hi' ? cat.nameHi || cat.name : cat.name);
              const isSelected = selectedCategory === (cat.slug || cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug || cat.id)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold font-mono tracking-wider transition-all uppercase truncate max-w-xs ${
                    isSelected
                      ? 'bg-carbon text-cream shadow-sm'
                      : 'bg-cream text-carbon/80 border border-carbon/15 hover:border-carbon'
                  }`}
                  title={catName}
                >
                  {catName}
                </button>
              );
            })}
          </div>

        </div>

        {/* Verified Notice Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-3 text-xs leading-relaxed">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Official Business Note:</span> All specifications, gauge thicknesses, and dimensions shown are verified workshop reference models. Custom dimensions for cupboards, trucks, or agricultural store rooms can be fabricated on order. Wholesale bulk pricing is quoted directly by Mohanbhai P. Chauhan.
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-carbon p-8 shadow-brutal space-y-4">
            <h3 className="font-display font-extrabold text-2xl text-carbon">
              {t.catalog.noProducts}
            </h3>
            <p className="text-sm text-carbon/60 max-w-md mx-auto">
              Try adjusting your search query or reset the filters to see all metal trunks and drums.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-carbon text-cream font-bold text-xs uppercase tracking-wider hover:bg-orange-electric hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.catalog.resetFilters}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
