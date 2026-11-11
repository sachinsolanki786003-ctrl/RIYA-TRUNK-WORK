import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="py-24 bg-cream min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl border-3 border-carbon p-8 sm:p-10 shadow-brutal text-center space-y-5">
        <div className="font-mono text-xs font-bold uppercase tracking-widest text-orange-electric">
          ERROR 404 // NOT FOUND
        </div>
        <h1 className="font-display font-black text-5xl text-carbon">
          404
        </h1>
        <p className="text-sm text-carbon/70">
          The storage box, product page, or destination you were looking for does not exist or has been moved.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-carbon text-cream font-display font-bold text-xs uppercase tracking-wider hover:bg-orange-electric hover:text-white transition-all shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
