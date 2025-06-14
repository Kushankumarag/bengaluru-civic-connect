
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, phone: string, address: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  adminSignUp: (email: string, password: string, fullName: string, phone: string, division: string, accessCode: string) => Promise<{ error: any }>;
  adminSignIn: (email: string, password: string, division: string, accessCode: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string, phone: string, address: string) => {
    const redirectUrl = `${window.location.origin}/dashboard`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          phone: phone,
          address: address,
          user_type: 'user'
        }
      }
    });
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    // First check if user exists in profiles table
    const { data: userProfile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (profileError && profileError.code !== 'PGRST116') {
      return { error: profileError };
    }

    if (!userProfile) {
      return { error: { message: 'User not found. Please sign up first.' } };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const adminSignUp = async (email: string, password: string, fullName: string, phone: string, division: string, accessCode: string) => {
    const redirectUrl = `${window.location.origin}/admin-dashboard`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          phone: phone,
          division: division,
          access_code: accessCode,
          user_type: 'admin'
        }
      }
    });
    
    return { error };
  };

  const adminSignIn = async (email: string, password: string, division: string, accessCode: string) => {
    // First check if admin exists in admin_profiles table with matching division and access code
    const { data: adminProfile, error: profileError } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('email', email)
      .eq('division', division)
      .eq('access_code', accessCode)
      .maybeSingle();

    if (profileError && profileError.code !== 'PGRST116') {
      return { error: profileError };
    }

    if (!adminProfile) {
      return { error: { message: 'Admin not found or invalid credentials. Please check your division and access code.' } };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    adminSignUp,
    adminSignIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
