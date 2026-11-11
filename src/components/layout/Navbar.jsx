import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useBusiness } from '../../context/BusinessContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Phone, MessageCircle, Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { getWhatsAppLink, getPhoneLink } from '../../lib/utils';

export default function Navbar() {
  const { t, lang } = useLanguage();
  const { settings } = useBusiness();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/products', label: t.nav.collections },
    { path: '/about', label: t.nav.about },
    { path: '/contact', label: t.nav.contact },
  ];

  const brandName = lang === 'gu' ? settings.nameGu || 'રિયા ટ્રંક વર્ક' : settings.name;

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-carbon/10 py-2.5' 
        : 'bg-cream border-b border-carbon/5 py-3.5'
    }`}>
      {/* Top Banner on Desktop */}
      <div className="hidden lg:block bg-carbon text-cream/80 text-[11px] py-1 px-4 -mt-3.5 mb-2 font-mono tracking-wider">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center text-orange-electric font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> {t.brand.wholesaleRetailTag}
            </span>
            <span className="text-silver/50">•</span>
            <span>{settings.address}</span>
          </div>
          <div className="flex items-center gap-4 text-cream/90 font-sans">
            <span>{t.contact.owner}</span>
            <a href={getPhoneLink(settings.phone_raw || '919724832538')} className="hover:text-orange-electric transition-colors flex items-center gap-1 font-semibold">
              <Phone className="w-3 h-3 text-orange-electric" /> {settings.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Wordmark */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 bg-carbon rounded-lg p-1.5 flex items-center justify-center border-2 border-carbon group-hover:border-orange-electric transition-colors shadow-brutal-sm">
              <img src="/favicon.svg" alt="RIYA TRUNK WORK Logo" className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-carbon">
                  RIYA<span className="text-orange-electric">.</span>TRUNK WORK
                </span>
              </div>
              <div className="text-[10px] font-semibold tracking-wider text-carbon/60 uppercase">
                {brandName} • AHMEDABAD
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-carbon text-cream shadow-sm'
                      : 'text-carbon/80 hover:text-carbon hover:bg-carbon/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions: Language, WhatsApp, Call */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-whatsapp text-white text-xs font-bold uppercase tracking-wider hover:bg-[#20b858] transition-all shadow-sm hover:shadow active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>{t.nav.whatsappUs}</span>
            </a>

            <a
              href={getPhoneLink(settings.phone_raw || '919724832538')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-carbon text-cream text-xs font-bold uppercase tracking-wider hover:bg-carbon-light transition-all border border-carbon"
            >
              <Phone className="w-3.5 h-3.5 text-orange-electric" />
              <span>{t.nav.callUs}</span>
            </a>
          </div>

          {/* Mobile Right Controls: Language & Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-carbon/5 text-carbon hover:bg-carbon/10 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream border-b border-carbon/15 px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col gap-2 pt-2 pb-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-xl text-base font-bold transition-all ${
                    isActive
                      ? 'bg-carbon text-cream'
                      : 'text-carbon hover:bg-carbon/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/admin/login"
              className="px-4 py-2 text-xs font-semibold text-carbon/60 hover:text-carbon"
            >
              {t.nav.admin}
            </Link>
          </div>

          {/* Mobile Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-carbon/10">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-whatsapp text-white font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{t.nav.whatsappUs}</span>
            </a>
            <a
              href={getPhoneLink(settings.phone_raw || '919724832538')}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-carbon text-cream font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              <Phone className="w-4 h-4 text-orange-electric" />
              <span>{t.nav.callUs}</span>
            </a>
          </div>

          <div className="mt-4 pt-3 text-center border-t border-carbon/5 text-xs text-carbon/60">
            <p className="font-semibold">{settings.owner}</p>
            <p className="text-[11px] mt-0.5">{settings.address}</p>
          </div>
        </div>
      )}
    </header>
  );
}
