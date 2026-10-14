import React, { useState } from 'react';
import { X, Lock, User as UserIcon, Shield, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRole?: (role: 'buyer' | 'admin') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessRole,
}) => {
  const { login, signup, adminLogin, googleSignIn } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup' | 'admin'>('signin');

  // Form states
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [adminPasskey, setAdminPasskey] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Google Selector State
  const [isGoogleSelectorOpen, setIsGoogleSelectorOpen] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    const ok = login(email);
    if (ok) {
      setSuccessMsg('Welcome back!');
      setTimeout(() => {
        onSuccessRole?.('buyer');
        onClose();
      }, 700);
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email) {
      setError('Please provide your name and email.');
      return;
    }
    const ok = signup(name, email, phone);
    if (ok) {
      setSuccessMsg('Account created successfully! Welcome to Orange Oregano.');
      setTimeout(() => {
        onSuccessRole?.('buyer');
        onClose();
      }, 700);
    }
  };

  const handleAdminSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ok = adminLogin(adminPasskey);
    if (ok) {
      setSuccessMsg('Admin access verified. Welcome to Candolim Atelier Dashboard.');
      setTimeout(() => {
        onSuccessRole?.('admin');
        onClose();
      }, 700);
    } else {
      setError('Invalid passkey. Default passkey is orange2026');
    }
  };

  const handleSelectGoogleAccount = (googleUser: { name: string; email: string; avatar?: string }) => {
    const ok = googleSignIn(googleUser);
    if (ok) {
      setIsGoogleSelectorOpen(false);
      setSuccessMsg(`Signed in with Google as ${googleUser.name}!`);
      setTimeout(() => {
        onSuccessRole?.('buyer');
        onClose();
      }, 700);
    }
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail) return;
    const rawPrefix = customGoogleEmail.split('@')[0];
    const gName = rawPrefix.charAt(0).toUpperCase() + rawPrefix.slice(1);
    handleSelectGoogleAccount({
      name: gName,
      email: customGoogleEmail,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative bg-[#FFFDF9] rounded-3xl max-w-md w-full p-6 sm:p-8 border-2 border-[#763c00] canva-box-shadow shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#f9f7dc] text-[#763c00] hover:bg-[#ef8535] hover:text-[#f9f7dc] transition-colors border border-[#763c00]/20"
        >
          <X size={18} />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase font-extrabold tracking-[0.25em] text-[#ef8535]">
            Orange Oregano
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-[#763c00]">
            {tab === 'admin' ? 'Atelier Admin Portal' : 'Customer Account'}
          </h2>
          <p className="text-xs text-[#554030] mt-1">
            {tab === 'admin' 
              ? 'Access product management, stock control & orders' 
              : 'Save liked pieces, track orders & view purchase history'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#ef8535]/20 mb-6 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => { setTab('signin'); setError(''); setIsGoogleSelectorOpen(false); }}
            className={`flex-1 py-2.5 border-b-2 transition-colors ${
              tab === 'signin'
                ? 'border-[#ef8535] text-[#ef8535]'
                : 'border-transparent text-gray-500 hover:text-[#763c00]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('signup'); setError(''); setIsGoogleSelectorOpen(false); }}
            className={`flex-1 py-2.5 border-b-2 transition-colors ${
              tab === 'signup'
                ? 'border-[#ef8535] text-[#ef8535]'
                : 'border-transparent text-gray-500 hover:text-[#763c00]'
            }`}
          >
            Create Account
          </button>
          <button
            onClick={() => { setTab('admin'); setError(''); setIsGoogleSelectorOpen(false); }}
            className={`flex-1 py-2.5 border-b-2 transition-colors flex items-center justify-center gap-1 ${
              tab === 'admin'
                ? 'border-[#763c00] text-[#763c00]'
                : 'border-transparent text-gray-500 hover:text-[#763c00]'
            }`}
          >
            <Shield size={12} />
            <span>Admin</span>
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 p-2.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 font-medium">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-2.5 bg-green-50 text-green-700 text-xs rounded-xl border border-green-200 font-medium flex items-center gap-1.5">
            <Check size={14} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* GOOGLE ACCOUNT CHOOSER SUB-MODAL */}
        {isGoogleSelectorOpen && (
          <div className="mb-6 p-4 bg-white rounded-2xl border-2 border-[#4285F4] shadow-md space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="text-xs font-bold text-gray-800">Choose a Google Account</span>
              </div>
              <button
                onClick={() => setIsGoogleSelectorOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xs p-1"
              >
                ✕
              </button>
            </div>

            {/* Quick Demo Google Accounts */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleSelectGoogleAccount({
                  name: 'Ananya Sharma',
                  email: 'ananya.sharma@gmail.com',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                })}
                className="w-full p-2.5 rounded-xl border border-gray-200 hover:border-[#4285F4] hover:bg-blue-50/50 flex items-center gap-3 transition-all text-left"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Ananya"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-800">Ananya Sharma</p>
                  <p className="text-[10px] text-gray-500">ananya.sharma@gmail.com</p>
                </div>
                <ArrowRight size={14} className="text-[#4285F4]" />
              </button>

              <button
                type="button"
                onClick={() => handleSelectGoogleAccount({
                  name: 'Karan Mehra',
                  email: 'karan.mehra@gmail.com',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                })}
                className="w-full p-2.5 rounded-xl border border-gray-200 hover:border-[#4285F4] hover:bg-blue-50/50 flex items-center gap-3 transition-all text-left"
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                  alt="Karan"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-800">Karan Mehra</p>
                  <p className="text-[10px] text-gray-500">karan.mehra@gmail.com</p>
                </div>
                <ArrowRight size={14} className="text-[#4285F4]" />
              </button>
            </div>

            {/* Custom Google account entry */}
            <div className="pt-2 border-t border-gray-100">
              <span className="text-[10px] font-semibold text-gray-500 block mb-1">
                Or enter your Google address:
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-[#4285F4]"
                />
                <button
                  type="button"
                  onClick={handleCustomGoogleSubmit}
                  className="px-3 py-1.5 bg-[#4285F4] text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: BUYER SIGN IN */}
        {tab === 'signin' && (
          <div className="space-y-4">
            
            {/* GOOGLE SIGN IN BUTTON */}
            <button
              type="button"
              onClick={() => setIsGoogleSelectorOpen(true)}
              className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-xl font-semibold text-xs flex items-center justify-center gap-2.5 shadow-xs transition-all hover:border-[#4285F4]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center my-3">
              <div className="flex-1 border-t border-gray-200" />
              <span className="px-3 text-[10px] text-gray-400 uppercase font-semibold">Or email</span>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. buyer@example.com"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#ef8535] text-[#f9f7dc] font-bold text-xs uppercase tracking-wider rounded-xl canva-box-shadow canva-box-shadow-hover flex items-center justify-center gap-2"
              >
                <UserIcon size={16} />
                <span>Sign In to Account</span>
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-[#763c00]/70 hover:underline hover:text-[#ef8535]"
                >
                  Or continue shopping as Guest →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: BUYER SIGN UP */}
        {tab === 'signup' && (
          <div className="space-y-4">
            
            {/* GOOGLE SIGN UP BUTTON */}
            <button
              type="button"
              onClick={() => setIsGoogleSelectorOpen(true)}
              className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-xl font-semibold text-xs flex items-center justify-center gap-2.5 shadow-xs transition-all hover:border-[#4285F4]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Sign Up with Google</span>
            </button>

            <div className="flex items-center my-3">
              <div className="flex-1 border-t border-gray-200" />
              <span className="px-3 text-[10px] text-gray-400 uppercase font-semibold">Or with email</span>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Nair"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. priya@example.com"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                  Phone Number (optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09823610024"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#ef8535] text-[#f9f7dc] font-bold text-xs uppercase tracking-wider rounded-xl canva-box-shadow canva-box-shadow-hover flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                <span>Create Account</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: ADMIN ACCESS */}
        {tab === 'admin' && (
          <form onSubmit={handleAdminSignIn} className="space-y-4">
            <div className="p-3 bg-[#f9f7dc] rounded-xl border border-[#ef8535]/30 text-xs text-[#763c00]">
              <p className="font-bold flex items-center gap-1.5 mb-1">
                <Lock size={12} className="text-[#ef8535]" />
                Store Management
              </p>
              <p className="text-[11px] text-[#554030]">
                Enter atelier manager passkey to access product catalog, add new garments, and manage out-of-stock items.
              </p>
              <p className="mt-1.5 text-[11px] font-semibold text-[#ef8535]">
                Demo passkey: <code className="bg-white px-1.5 py-0.5 rounded border border-[#ef8535]/40 text-[#763c00]">orange2026</code>
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#763c00] uppercase mb-1">
                Admin Passkey
              </label>
              <input
                type="password"
                required
                value={adminPasskey}
                onChange={(e) => setAdminPasskey(e.target.value)}
                placeholder="Enter passkey"
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#ef8535]/30 focus:outline-none focus:border-[#ef8535]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#763c00] text-[#f9f7dc] font-bold text-xs uppercase tracking-wider rounded-xl canva-box-shadow canva-box-shadow-hover flex items-center justify-center gap-2 hover:bg-[#582c00]"
            >
              <Shield size={16} />
              <span>Enter Admin Dashboard</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
