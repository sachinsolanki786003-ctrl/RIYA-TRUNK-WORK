import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useBusiness } from '../../context/BusinessContext';
import { Phone, MessageCircle, MapPin, Mail, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { getWhatsAppLink, getPhoneLink } from '../../lib/utils';

export default function Footer() {
  const { t, lang } = useLanguage();
  const { settings, categories } = useBusiness();

  const brandName = lang === 'gu' ? settings.nameGu || 'રિયા ટ્રંક વર્ક' : settings.name;

  return (
    <footer className="bg-carbon text-cream/90 pt-16 pb-8 border-t-4 border-orange-electric">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-cream/10">
          
          {/* Brand Col (2 cols wide) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 bg-cream rounded-xl p-2 flex items-center justify-center border-2 border-orange-electric shadow-brutal-orange">
                <img src="/favicon.svg" alt="RIYA TRUNK WORK" className="w-full h-full" />
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-tight text-white block">
                  RIYA<span className="text-orange-electric">.</span>TRUNK WORK
                </span>
                <span className="text-xs font-semibold tracking-wider text-silver uppercase block">
                  {brandName} • AHMEDABAD
                </span>
              </div>
            </Link>

            <p className="text-cream/70 text-sm max-w-md font-sans leading-relaxed">
              {t.brand.subtagline}
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream/10 border border-cream/15 text-xs text-orange-electric font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.brand.wholesaleRetailTag}</span>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-whatsapp text-white text-xs font-bold tracking-wide hover:brightness-110 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp: {settings.whatsapp}</span>
              </a>
              <a
                href={getPhoneLink(settings.phone_raw || '919724832538')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-darkgrey text-cream text-xs font-bold tracking-wide hover:bg-darkgrey-elevated transition-all border border-cream/20"
              >
                <Phone className="w-4 h-4 text-orange-electric" />
                <span>Call: {settings.phone}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-sm tracking-widest uppercase">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/70">
              <li>
                <Link to="/" className="hover:text-orange-electric transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-orange-electric" /> {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-orange-electric transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-orange-electric" /> {t.nav.collections}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-electric transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-orange-electric" /> {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-electric transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-orange-electric" /> {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-silver/60 hover:text-white transition-colors flex items-center gap-1.5 text-xs">
                  <ArrowRight className="w-2.5 h-2.5" /> {t.nav.admin}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-sm tracking-widest uppercase">
              {t.footer.categories}
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/70">
              {categories.slice(0, 5).map((cat) => {
                const catName = lang === 'gu' ? cat.nameGu || cat.name : (lang === 'hi' ? cat.nameHi || cat.name : cat.name);
                return (
                  <li key={cat.id}>
                    <Link
                      to={`/products?category=${cat.slug || cat.id}`}
                      className="hover:text-orange-electric transition-colors block text-xs truncate"
                      title={catName}
                    >
                      {catName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact & Address */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-sm tracking-widest uppercase">
              {t.footer.contact}
            </h4>
            <div className="space-y-3 text-xs text-cream/75 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-electric shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">{settings.owner}</p>
                  <p className="text-cream/70">{settings.address}</p>
                  <a
                    href={settings.mapsDirectionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-orange-electric font-semibold mt-1 hover:underline"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-orange-electric shrink-0" />
                <a href={getPhoneLink(settings.phone_raw || '919724832538')} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-whatsapp shrink-0" />
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {settings.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">RIYA TRUNK WORK</strong> ({settings.nameGu || 'રિયા ટ્રંક વર્ક'}). {t.footer.rights}
          </div>
          <div className="font-mono text-[11px] text-silver/60">
            {t.footer.devCredit}
          </div>
        </div>

      </div>
    </footer>
  );
}
