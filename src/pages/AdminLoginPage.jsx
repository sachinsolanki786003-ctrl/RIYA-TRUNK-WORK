import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBusiness } from '../context/BusinessContext';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { loginAdmin, adminUser } = useBusiness();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already logged in, redirect
  React.useEffect(() => {
    if (adminUser) {
      navigate('/admin/dashboard');
    }
  }, [adminUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginAdmin(email.trim(), password);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 sm:py-24 bg-cream min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border-3 border-carbon p-8 sm:p-10 shadow-brutal-lg space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-carbon rounded-2xl p-2 mx-auto flex items-center justify-center border-2 border-orange-electric shadow-brutal-sm">
            <Lock className="w-6 h-6 text-orange-electric" />
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-carbon uppercase tracking-tight">
            ADMIN PORTAL
          </h1>
          <p className="text-xs text-carbon/60">
            RIYA TRUNK WORK • Secure Management Dashboard
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-carbon mb-1 uppercase font-mono">
              Admin Email / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-carbon/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="admin@riyatrunkwork.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-carbon/20 bg-cream-light text-carbon font-sans text-sm focus:outline-none focus:border-orange-electric"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-carbon mb-1 uppercase font-mono">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-carbon/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-carbon/20 bg-cream-light text-carbon font-sans text-sm focus:outline-none focus:border-orange-electric"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-carbon text-cream font-display font-bold text-xs uppercase tracking-wider hover:bg-orange-electric hover:text-white transition-all duration-300 shadow-brutal flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Info Card */}
        <div className="pt-4 border-t border-carbon/10 text-center text-xs text-carbon/60 space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-bold text-carbon">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-electric" />
            <span>Role-Based Access Control</span>
          </div>
          <p className="text-[11px]">
            Authorized personnel only (Mohanbhai P. Chauhan & Staff).
          </p>
        </div>

      </div>
    </div>
  );
}
