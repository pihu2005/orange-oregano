import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Heart, MapPin, User as UserIcon, Shield, Package, LogOut } from 'lucide-react';
import { Category } from '../types';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAuth: () => void;
  onOpenBuyerDashboard: () => void;
  onOpenOrderTracker: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenAuth,
  onOpenBuyerDashboard,
  onOpenOrderTracker,
  onOpenAdmin,
}) => {
  const { currentUser, role, logout, wishlist } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks: { label: string; category?: Category; href?: string }[] = [
    { label: 'Shop All', category: 'all' },
    { label: 'Women', category: 'women' },
    { label: 'Men', category: 'men' },
    { label: 'Accessories', category: 'accessories' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Goa Studio', href: '#studio' },
    { label: 'Lookbook', href: '#lookbook' },
  ];

  const handleLinkClick = (link: { label: string; category?: Category; href?: string }) => {
    if (link.category) {
      onSelectCategory(link.category);
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (link.href) {
      const el = document.querySelector(link.href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#ef8535]/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#763c00] hover:text-[#ef8535] focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Left Navigation on Desktop */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium tracking-wide">
            {navLinks.slice(0, 4).map((link) => {
              const isActive = link.category && activeCategory === link.category;
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link)}
                  className={`relative py-1 transition-colors ${
                    isActive 
                      ? 'text-[#ef8535] font-semibold' 
                      : 'text-[#4A2600]/80 hover:text-[#ef8535]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ef8535] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Central Brand Logo */}
          <div className="flex-1 lg:flex-none text-center">
            <a 
              href="#" 
              className="inline-block group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#763c00] font-bold tracking-tight transition-transform duration-300 group-hover:scale-[1.02]">
                Orange <span className="text-[#ef8535]">Oregano</span>
              </h1>
              <span className="block text-[10px] tracking-[0.25em] uppercase font-semibold text-[#ef8535] -mt-1">
                Candolim • Goa
              </span>
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            
            {/* Philosophy & Studio Links */}
            <nav className="hidden xl:flex items-center space-x-5 text-sm font-medium tracking-wide text-[#4A2600]/80">
              <button 
                onClick={() => handleLinkClick({ label: 'Philosophy', href: '#philosophy' })}
                className="hover:text-[#ef8535] transition-colors"
              >
                Philosophy
              </button>
              <button 
                onClick={() => handleLinkClick({ label: 'Goa Studio', href: '#studio' })}
                className="hover:text-[#ef8535] transition-colors flex items-center gap-1 text-[#ef8535] font-medium"
              >
                <MapPin size={14} />
                <span>Goa Studio</span>
              </button>
            </nav>

            {/* Search Input Toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search linens, dresses..."
                    className="w-36 sm:w-52 pl-3 pr-8 py-1.5 text-xs bg-[#f4ede2]/60 border border-[#ef8535]/30 rounded-full focus:outline-none focus:border-[#ef8535] transition-all"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      onSearchChange('');
                    }}
                    className="absolute right-2 text-[#763c00]/60 hover:text-[#ef8535]"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-[#763c00] hover:text-[#ef8535] transition-colors"
                  aria-label="Search"
                >
                  <Search size={19} />
                </button>
              )}
            </div>

            {/* Wishlist Link with Count */}
            <button 
              onClick={currentUser ? onOpenBuyerDashboard : () => {
                const el = document.getElementById('catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative p-2 text-[#763c00] hover:text-[#ef8535] transition-colors"
              title="Liked Pieces"
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ef8535]" />
              )}
            </button>

            {/* USER ACCOUNT DROPDOWN / BUTTON */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`p-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
                  role === 'admin'
                    ? 'bg-[#763c00] text-[#f9f7dc] px-2.5 py-1 text-xs font-bold'
                    : role === 'buyer'
                    ? 'bg-[#ef8535]/15 text-[#ef8535]'
                    : 'text-[#763c00] hover:text-[#ef8535]'
                }`}
                title="Account / Admin"
              >
                {role === 'admin' ? (
                  <>
                    <Shield size={14} />
                    <span className="hidden sm:inline">Admin</span>
                  </>
                ) : currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#ef8535]"
                  />
                ) : (
                  <UserIcon size={19} />
                )}
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-[#FFFDF9] rounded-2xl border-2 border-[#763c00] canva-box-shadow shadow-xl py-2 z-50 text-xs animate-fadeIn"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  {role === 'buyer' && currentUser ? (
                    <>
                      <div className="px-4 py-2 border-b border-[#ef8535]/15 flex items-center gap-2.5">
                        {currentUser.avatar ? (
                          <img
                            src={currentUser.avatar}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover border border-[#ef8535]"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#ef8535]/20 flex items-center justify-center text-[#ef8535]">
                            <UserIcon size={16} />
                          </div>
                        )}
                        <div className="overflow-hidden">
                          <p className="font-bold text-[#763c00] truncate">{currentUser.name}</p>
                          <p className="text-[10px] text-gray-500 truncate">{currentUser.email}</p>
                        </div>
                      </div>

                      <button
                        onClick={onOpenBuyerDashboard}
                        className="w-full px-4 py-2 text-left hover:bg-[#ef8535]/10 flex items-center gap-2 font-semibold text-[#763c00]"
                      >
                        <UserIcon size={14} className="text-[#ef8535]" />
                        <span>My Account & Orders</span>
                      </button>

                      <button
                        onClick={onOpenOrderTracker}
                        className="w-full px-4 py-2 text-left hover:bg-[#ef8535]/10 flex items-center gap-2 font-semibold text-[#763c00]"
                      >
                        <Package size={14} className="text-[#ef8535]" />
                        <span>Track Package</span>
                      </button>

                      <div className="border-t border-[#ef8535]/15 mt-1 pt-1">
                        <button
                          onClick={logout}
                          className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2 font-semibold"
                        >
                          <LogOut size={14} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : role === 'admin' ? (
                    <>
                      <div className="px-4 py-2 border-b border-[#ef8535]/15">
                        <p className="font-bold text-[#763c00]">Atelier Manager</p>
                        <span className="text-[10px] text-[#ef8535] font-bold uppercase">Admin Session Active</span>
                      </div>

                      <button
                        onClick={onOpenAdmin}
                        className="w-full px-4 py-2 text-left hover:bg-[#ef8535]/10 flex items-center gap-2 font-bold text-[#763c00]"
                      >
                        <Shield size={14} className="text-[#ef8535]" />
                        <span>Admin Dashboard</span>
                      </button>

                      <button
                        onClick={onOpenOrderTracker}
                        className="w-full px-4 py-2 text-left hover:bg-[#ef8535]/10 flex items-center gap-2 font-semibold text-[#763c00]"
                      >
                        <Package size={14} className="text-[#ef8535]" />
                        <span>Track Any Order</span>
                      </button>

                      <div className="border-t border-[#ef8535]/15 mt-1 pt-1">
                        <button
                          onClick={logout}
                          className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2 font-semibold"
                        >
                          <LogOut size={14} />
                          <span>Exit Admin Mode</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 border-b border-[#ef8535]/15">
                        <p className="font-bold text-[#763c00]">Welcome, Guest</p>
                        <p className="text-[10px] text-gray-500">Sign in for purchase history</p>
                      </div>

                      <button
                        onClick={onOpenAuth}
                        className="w-full px-4 py-2 text-left hover:bg-[#ef8535]/10 flex items-center gap-2 font-bold text-[#ef8535]"
                      >
                        <UserIcon size={14} />
                        <span>Sign In / Create Account</span>
                      </button>

                      <button
                        onClick={onOpenOrderTracker}
                        className="w-full px-4 py-2 text-left hover:bg-[#ef8535]/10 flex items-center gap-2 font-semibold text-[#763c00]"
                      >
                        <Package size={14} className="text-[#ef8535]" />
                        <span>Track Guest Order</span>
                      </button>

                      <div className="border-t border-[#ef8535]/15 mt-1 pt-1">
                        <button
                          onClick={onOpenAdmin}
                          className="w-full px-4 py-2 text-left hover:bg-[#f9f7dc] text-[#763c00] flex items-center gap-2 font-semibold"
                        >
                          <Shield size={14} />
                          <span>Admin Portal (Boutique)</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Bag Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-[#ef8535] text-[#f9f7dc] rounded-full canva-box-shadow-hover flex items-center justify-center"
              aria-label="View shopping bag"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#763c00] text-[#f9f7dc] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#fffdf9] animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] border-t border-[#ef8535]/20 px-4 pt-4 pb-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className={`py-2 px-3 text-left rounded-lg text-sm font-medium ${
                  link.category && activeCategory === link.category
                    ? 'bg-[#ef8535] text-[#f9f7dc]'
                    : 'bg-[#f4ede2]/60 text-[#763c00] hover:bg-[#ef8535]/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="border-t border-[#ef8535]/15 pt-3 flex gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (currentUser) onOpenBuyerDashboard();
                else onOpenAuth();
              }}
              className="flex-1 py-2 bg-[#f9f7dc] text-[#763c00] rounded-xl text-xs font-bold border border-[#763c00]/30"
            >
              {currentUser ? `Account (${currentUser.name})` : 'Sign In / Register'}
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenOrderTracker();
              }}
              className="flex-1 py-2 bg-[#ef8535] text-[#f9f7dc] rounded-xl text-xs font-bold"
            >
              Track Order
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
