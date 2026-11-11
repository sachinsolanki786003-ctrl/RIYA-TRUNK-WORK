import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategoryBento from '../components/home/CategoryBento';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BrandStory from '../components/home/BrandStory';
import WhyChooseUs from '../components/home/WhyChooseUs';
import WholesaleRetailSection from '../components/home/WholesaleRetailSection';
import VisitShopMap from '../components/home/VisitShopMap';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <CategoryBento />
      <FeaturedProducts />
      <BrandStory />
      <WhyChooseUs />
      <WholesaleRetailSection />
      <VisitShopMap />
    </div>
  );
}
