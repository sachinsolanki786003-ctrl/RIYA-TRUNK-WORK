import React from 'react';

export default function ProductIllustration({ type, className = "w-full h-full", accentColor = "#FF6538" }) {
  switch (type) {
    case 'svg-trunk-classic':
      return (
        <svg viewBox="0 0 400 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A2A2A" />
              <stop offset="50%" stopColor="#1E1E1E" />
              <stop offset="100%" stopColor="#141414" />
            </linearGradient>
            <linearGradient id="lidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#383838" />
              <stop offset="100%" stopColor="#222222" />
            </linearGradient>
            <linearGradient id="metalHasp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7A52" />
              <stop offset="100%" stopColor="#E54E20" />
            </linearGradient>
          </defs>
          
          {/* Shadow */}
          <ellipse cx="200" cy="255" rx="150" ry="16" fill="#000000" fillOpacity="0.35" filter="blur(6px)" />
          
          {/* Main Trunk Body */}
          <rect x="60" y="90" width="280" height="150" rx="8" fill="url(#trunkGrad)" stroke="#3E3E3E" strokeWidth="3" />
          
          {/* Trunk Lid */}
          <path d="M55 90 C55 84 59 78 68 76 L332 76 C341 78 345 84 345 90 L342 98 L58 98 Z" fill="url(#lidGrad)" stroke="#4A4A4A" strokeWidth="2.5" />
          <line x1="56" y1="98" x2="344" y2="98" stroke="#101010" strokeWidth="3" />

          {/* Stamped Structural Reinforcement Ribs */}
          <line x1="120" y1="108" x2="120" y2="230" stroke="#333" strokeWidth="5" strokeLinecap="round" />
          <line x1="120" y1="108" x2="120" y2="230" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
          
          <line x1="280" y1="108" x2="280" y2="230" stroke="#333" strokeWidth="5" strokeLinecap="round" />
          <line x1="280" y1="108" x2="280" y2="230" stroke="#161616" strokeWidth="2" strokeLinecap="round" />

          {/* Corner Protective Brackets */}
          <path d="M60 115 V94 H85" stroke={accentColor} strokeWidth="5" strokeLinecap="square" />
          <path d="M340 115 V94 H315" stroke={accentColor} strokeWidth="5" strokeLinecap="square" />
          <path d="M60 215 V238 H85" stroke={accentColor} strokeWidth="5" strokeLinecap="square" />
          <path d="M340 215 V238 H315" stroke={accentColor} strokeWidth="5" strokeLinecap="square" />

          {/* Industrial Rivets */}
          <circle cx="70" cy="103" r="2.5" fill="#A8ADB2" />
          <circle cx="330" cy="103" r="2.5" fill="#A8ADB2" />
          <circle cx="70" cy="229" r="2.5" fill="#A8ADB2" />
          <circle cx="330" cy="229" r="2.5" fill="#A8ADB2" />

          {/* Heavy Steel Side Handles */}
          <rect x="42" y="145" width="16" height="40" rx="4" fill="#252525" stroke="#444" strokeWidth="2" />
          <path d="M46 152 V178" stroke="#A8ADB2" strokeWidth="4" strokeLinecap="round" />
          <rect x="342" y="145" width="16" height="40" rx="4" fill="#252525" stroke="#444" strokeWidth="2" />
          <path d="M354 152 V178" stroke="#A8ADB2" strokeWidth="4" strokeLinecap="round" />

          {/* Central Heavy Latch & Padlock Hasp */}
          <rect x="188" y="85" width="24" height="42" rx="4" fill="url(#metalHasp)" stroke="#B33E16" strokeWidth="2" />
          <circle cx="200" cy="112" r="3.5" fill="#FFFFFF" />
          <line x1="192" y1="98" x2="208" y2="98" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.6" />

          {/* Branding Badge */}
          <rect x="175" y="145" width="50" height="18" rx="2" fill="#111" stroke={accentColor} strokeWidth="1" />
          <text x="200" y="157" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle" letterSpacing="0.8">RIYA TRUNK</text>
        </svg>
      );

    case 'svg-drum-grain':
      return (
        <svg viewBox="0 0 400 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="drumGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#40454A" />
              <stop offset="30%" stopColor="#8A929A" />
              <stop offset="65%" stopColor="#B6BEC6" />
              <stop offset="85%" stopColor="#6C757D" />
              <stop offset="100%" stopColor="#343A40" />
            </linearGradient>
            <linearGradient id="lidRing" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          <ellipse cx="200" cy="258" rx="100" ry="14" fill="#000000" fillOpacity="0.3" filter="blur(6px)" />
          
          {/* Drum Body Cylinder */}
          <path d="M120 70 L120 230 C120 245 280 245 280 230 L280 70 Z" fill="url(#drumGrad)" stroke="#4A525A" strokeWidth="2.5" />
          
          {/* Circumferential Stiffening Rings (Authentic Indian Grain Drum design) */}
          <ellipse cx="200" cy="115" rx="80" ry="12" fill="none" stroke="#252A2E" strokeWidth="4" />
          <ellipse cx="200" cy="115" rx="80" ry="12" fill="none" stroke="#E2E6E9" strokeWidth="1.5" />

          <ellipse cx="200" cy="165" rx="80" ry="12" fill="none" stroke="#252A2E" strokeWidth="4" />
          <ellipse cx="200" cy="165" rx="80" ry="12" fill="none" stroke="#E2E6E9" strokeWidth="1.5" />

          <ellipse cx="200" cy="215" rx="80" ry="12" fill="none" stroke="#252A2E" strokeWidth="4" />
          <ellipse cx="200" cy="215" rx="80" ry="12" fill="none" stroke="#E2E6E9" strokeWidth="1.5" />

          {/* Airtight Friction Lid */}
          <ellipse cx="200" cy="65" rx="82" ry="16" fill="url(#lidRing)" stroke="#78350F" strokeWidth="2" />
          <ellipse cx="200" cy="60" rx="72" ry="12" fill="#4B5563" stroke="#9CA3AF" strokeWidth="1" />
          
          {/* Top Handle */}
          <path d="M175 58 C175 42 225 42 225 58" stroke="#FF6538" strokeWidth="5" strokeLinecap="round" fill="none" />

          {/* Bottom Ground-Clearance Skirt */}
          <path d="M118 230 C118 248 282 248 282 230" stroke="#FF6538" strokeWidth="5" fill="none" />
          
          {/* Side Drop Handles */}
          <path d="M112 135 C100 135 100 155 112 155" stroke="#333" strokeWidth="4" fill="none" />
          <path d="M288 135 C300 135 300 155 288 155" stroke="#333" strokeWidth="4" fill="none" />
        </svg>
      );

    case 'svg-trunk-jumbo':
      return (
        <svg viewBox="0 0 400 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="jumboGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E2328" />
              <stop offset="50%" stopColor="#12161A" />
              <stop offset="100%" stopColor="#0B0E11" />
            </linearGradient>
          </defs>
          <ellipse cx="200" cy="260" rx="165" ry="16" fill="#000000" fillOpacity="0.4" filter="blur(6px)" />
          
          {/* Extra-Deep Jumbo Body */}
          <rect x="40" y="80" width="320" height="170" rx="6" fill="url(#jumboGrad)" stroke="#3A4048" strokeWidth="3" />
          
          {/* Reinforced Lid with Triple Corrugation */}
          <path d="M35 80 L365 80 L360 64 L40 64 Z" fill="#2D3339" stroke="#4F5761" strokeWidth="2.5" />
          <line x1="36" y1="80" x2="364" y2="80" stroke="#000" strokeWidth="4" />
          
          {/* Three Structural Ribs */}
          <line x1="110" y1="95" x2="110" y2="240" stroke="#252A30" strokeWidth="6" strokeLinecap="round" />
          <line x1="200" y1="95" x2="200" y2="240" stroke="#252A30" strokeWidth="6" strokeLinecap="round" />
          <line x1="290" y1="95" x2="290" y2="240" stroke="#252A30" strokeWidth="6" strokeLinecap="round" />

          {/* Heavy Dual Locking Clasps */}
          <rect x="130" y="75" width="18" height="34" rx="3" fill="#FF6538" stroke="#CC461D" strokeWidth="2" />
          <circle cx="139" cy="98" r="3" fill="#FFF" />
          <rect x="252" y="75" width="18" height="34" rx="3" fill="#FF6538" stroke="#CC461D" strokeWidth="2" />
          <circle cx="261" cy="98" r="3" fill="#FFF" />

          {/* Heavy Double Lifting Bar Handles on Sides */}
          <rect x="20" y="140" width="18" height="50" rx="4" fill="#151515" stroke="#555" strokeWidth="2" />
          <path d="M26 148 V182" stroke="#FF6538" strokeWidth="4" strokeLinecap="round" />
          <rect x="362" y="140" width="18" height="50" rx="4" fill="#151515" stroke="#555" strokeWidth="2" />
          <path d="M374 148 V182" stroke="#FF6538" strokeWidth="4" strokeLinecap="round" />

          {/* Corner Steel Bracing */}
          <path d="M40 105 V82 H70" stroke="#A8ADB2" strokeWidth="4" />
          <path d="M360 105 V82 H330" stroke="#A8ADB2" strokeWidth="4" />
          <path d="M40 225 V248 H70" stroke="#A8ADB2" strokeWidth="4" />
          <path d="M360 225 V248 H330" stroke="#A8ADB2" strokeWidth="4" />
        </svg>
      );

    case 'svg-ss-box':
      return (
        <svg viewBox="0 0 400 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ssGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5E7EB" />
              <stop offset="25%" stopColor="#9CA3AF" />
              <stop offset="50%" stopColor="#F3F4F6" />
              <stop offset="75%" stopColor="#9CA3AF" />
              <stop offset="100%" stopColor="#D1D5DB" />
            </linearGradient>
            <linearGradient id="ssLid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#9CA3AF" />
            </linearGradient>
          </defs>
          <ellipse cx="200" cy="254" rx="145" ry="14" fill="#000000" fillOpacity="0.25" filter="blur(6px)" />

          {/* Polished Mirror-Finish SS Body */}
          <rect x="65" y="85" width="270" height="155" rx="6" fill="url(#ssGrad)" stroke="#CBD5E1" strokeWidth="2.5" />
          
          {/* Beveled SS Lid */}
          <path d="M60 85 L340 85 L335 70 L65 70 Z" fill="url(#ssLid)" stroke="#E2E8F0" strokeWidth="2" />
          <line x1="60" y1="85" x2="340" y2="85" stroke="#64748B" strokeWidth="2" />

          {/* Stainless Reflection Sheen Lines */}
          <line x1="140" y1="87" x2="170" y2="238" stroke="#FFFFFF" strokeWidth="12" strokeOpacity="0.4" />
          <line x1="165" y1="87" x2="195" y2="238" stroke="#FFFFFF" strokeWidth="4" strokeOpacity="0.6" />

          {/* Premium SS Hasp */}
          <rect x="190" y="80" width="20" height="38" rx="3" fill="#475569" stroke="#E2E8F0" strokeWidth="2" />
          <circle cx="200" cy="106" r="3" fill="#FF6538" />

          {/* Cast Stainless Handles */}
          <path d="M50 145 C42 145 42 175 50 175" stroke="#475569" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M350 145 C358 145 358 175 350 175" stroke="#475569" strokeWidth="5" fill="none" strokeLinecap="round" />

          <text x="200" y="155" fill="#334155" fontSize="7" fontWeight="bold" textAnchor="middle" letterSpacing="1">SS 304 GRADE • RUST PROOF</text>
        </svg>
      );

    case 'svg-gi-box':
    case 'svg-trunk-compact':
    default:
      return (
        <svg viewBox="0 0 400 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="giGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A5568" />
              <stop offset="50%" stopColor="#2D3748" />
              <stop offset="100%" stopColor="#1A202C" />
            </linearGradient>
          </defs>
          <ellipse cx="200" cy="254" rx="140" ry="14" fill="#000000" fillOpacity="0.3" filter="blur(6px)" />
          <rect x="70" y="90" width="260" height="150" rx="6" fill="url(#giGrad)" stroke="#4A5568" strokeWidth="3" />
          
          {/* Lid */}
          <rect x="66" y="78" width="268" height="15" rx="3" fill="#334155" stroke="#64748B" strokeWidth="2" />
          
          {/* Galvanized Spangle Texture Simulation */}
          <circle cx="110" cy="130" r="1.5" fill="#94A3B8" opacity="0.6" />
          <circle cx="160" cy="180" r="2" fill="#94A3B8" opacity="0.6" />
          <circle cx="240" cy="120" r="1.5" fill="#94A3B8" opacity="0.6" />
          <circle cx="290" cy="170" r="2" fill="#94A3B8" opacity="0.6" />
          
          {/* Corner Bracing */}
          <path d="M70 115 V92 H95" stroke={accentColor} strokeWidth="4" />
          <path d="M330 115 V92 H305" stroke={accentColor} strokeWidth="4" />
          <path d="M70 215 V238 H95" stroke={accentColor} strokeWidth="4" />
          <path d="M330 215 V238 H305" stroke={accentColor} strokeWidth="4" />

          {/* Central Hasp */}
          <rect x="190" y="86" width="20" height="34" rx="3" fill={accentColor} />
          <circle cx="200" cy="108" r="3" fill="#FFF" />

          {/* Steel Grip Handles */}
          <path d="M56 148 C48 148 48 178 56 178" stroke="#FF6538" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M344 148 C352 148 352 178 344 178" stroke="#FF6538" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      );
  }
}
