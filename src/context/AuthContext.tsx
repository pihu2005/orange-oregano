import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  role: UserRole;
  login: (email: string, pass?: string) => boolean;
  signup: (name: string, email: string, phone?: string, pass?: string) => boolean;
  adminLogin: (passkey: string) => boolean;
  googleSignIn: (googleProfile?: { name: string; email: string; avatar?: string }) => boolean;
  logout: () => void;
  updateProfile: (profile: Partial<User>) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_PASSKEY = 'orange2026';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('orange_oregano_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('orange_oregano_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const role: UserRole = currentUser ? currentUser.role : 'guest';

  // Save current user to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('orange_oregano_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('orange_oregano_current_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('orange_oregano_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const login = (email: string) => {
    // Check if user exists in registered users list
    const usersRaw = localStorage.getItem('orange_oregano_registered_users');
    const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (found) {
      setCurrentUser(found);
      if (found.wishlist) setWishlist(found.wishlist);
      return true;
    }

    // Demo fallback: create buyer user if not found
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      role: 'buyer',
      wishlist: wishlist,
    };
    users.push(newUser);
    localStorage.setItem('orange_oregano_registered_users', JSON.stringify(users));
    setCurrentUser(newUser);
    return true;
  };

  const signup = (name: string, email: string, phone: string = '', _pass?: string) => {
    const usersRaw = localStorage.getItem('orange_oregano_registered_users');
    const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      role: 'buyer',
      wishlist: wishlist,
      shippingAddress: {
        street: 'Marquis Vaddo',
        city: 'Candolim',
        pincode: '403515',
        state: 'Goa'
      }
    };

    users.push(newUser);
    localStorage.setItem('orange_oregano_registered_users', JSON.stringify(users));
    setCurrentUser(newUser);
    return true;
  };

  const adminLogin = (passkey: string) => {
    if (passkey.trim() === ADMIN_PASSKEY) {
      const adminUser: User = {
        id: 'admin-01',
        name: 'Candolim Atelier Manager',
        email: 'admin@orangeoregano.in',
        phone: '09823610024',
        role: 'admin',
      };
      setCurrentUser(adminUser);
      return true;
    }
    return false;
  };

  const googleSignIn = (googleProfile?: { name: string; email: string; avatar?: string }) => {
    const defaultProfile = {
      name: 'Ananya Sharma',
      email: 'ananya.sharma@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };

    const profile = googleProfile || defaultProfile;
    const usersRaw = localStorage.getItem('orange_oregano_registered_users');
    const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];
    
    const existing = users.find((u) => u.email.toLowerCase() === profile.email.toLowerCase());

    if (existing) {
      const updated = {
        ...existing,
        name: profile.name || existing.name,
        avatar: profile.avatar || existing.avatar,
      };
      setCurrentUser(updated);
      if (updated.wishlist) setWishlist(updated.wishlist);
      return true;
    }

    const newUser: User = {
      id: `google-${Date.now()}`,
      name: profile.name,
      email: profile.email,
      avatar: profile.avatar,
      role: 'buyer',
      wishlist: wishlist,
      shippingAddress: {
        street: 'Marquis Vaddo, Candolim Beach Road',
        city: 'Candolim',
        pincode: '403515',
        state: 'Goa',
      },
    };

    users.push(newUser);
    localStorage.setItem('orange_oregano_registered_users', JSON.stringify(users));
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (profile: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...profile };
    setCurrentUser(updated);

    // Update in registered users list as well
    const usersRaw = localStorage.getItem('orange_oregano_registered_users');
    if (usersRaw) {
      const users: User[] = JSON.parse(usersRaw);
      const idx = users.findIndex((u) => u.id === currentUser.id);
      if (idx > -1) {
        users[idx] = updated;
        localStorage.setItem('orange_oregano_registered_users', JSON.stringify(users));
      }
    }
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      if (currentUser) {
        updateProfile({ wishlist: next });
      }
      return next;
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        login,
        signup,
        adminLogin,
        googleSignIn,
        logout,
        updateProfile,
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
