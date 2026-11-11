import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppLink } from '../../lib/utils';
import { useLanguage } from '../../context/LanguageContext';
import { useBusiness } from '../../context/BusinessContext';

export default function FloatingWhatsApp() {
  const { lang } = useLanguage();
  const { settings } = useBusiness();
  const [showTooltip, setShowTooltip] = useState(true);

  const greeting = lang === 'gu'
    ? 'મોહનભાઈ ચૌહાણ સાથે વોટ્સએપ પર વાત કરો'
    : (lang === 'hi' ? 'मोहनभाई चौहान से व्हाट्सएप पर बात करें' : 'Chat with Mohanbhai Chauhan on WhatsApp');

  return (
    <div className="fixed bottom-6 right-5 z-50 flex items-end gap-3 pointer-events-none">
      
      {/* Tooltip Popup */}
      {showTooltip && (
        <div className="pointer-events-auto hidden sm:flex items-center gap-2 bg-carbon text-cream text-xs px-3.5 py-2 rounded-xl shadow-xl border border-cream/20 animate-bounce duration-1000">
          <span className="w-2 h-2 rounded-full bg-whatsapp animate-ping"></span>
          <span className="font-medium">{greeting}</span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-silver hover:text-white p-0.5 ml-1"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Chat with RIYA TRUNK WORK"
        className="pointer-events-auto relative group flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/40"
      >
        {/* Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-whatsapp opacity-40 animate-ping group-hover:opacity-0"></span>
        
        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-current relative z-10" />

        {/* Online Status Dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-carbon rounded-full z-20"></span>
      </a>

    </div>
  );
}
