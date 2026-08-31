'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid password. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <Image src="/logo.png" alt="TCM Home Solutions" fill className="object-contain rounded-full" />
          </div>
          <h1 className="font-serif text-cream text-2xl">Admin Portal</h1>
          <p className="text-cream/50 text-xs mt-1 font-sans">TCM Home Solutions LLC</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-card-lg p-8 shadow-card-hover">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={16} className="text-forest" />
            <h2 className="font-sans text-forest text-sm font-semibold">Enter Admin Password</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold text-body/60 font-sans mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                  className="w-full bg-cream border border-body/10 rounded-xl px-4 py-3 pr-10 text-body text-sm font-sans outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20 placeholder:text-body/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-body/40 hover:text-body/70 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              id="admin-login-submit"
              disabled={loading || !password}
              className="w-full bg-forest text-cream rounded-full py-3 text-sm font-semibold font-sans hover:bg-forest-dark transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-cream/30 text-xs text-center mt-6 font-sans">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
