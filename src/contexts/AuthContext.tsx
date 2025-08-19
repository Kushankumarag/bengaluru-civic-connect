import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, phone: string, address: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  
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
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
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
    console.log('User login attempt:', { email });
    
    try {
      // Directly authenticate with Supabase - no need to check profiles first
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('User auth response:', { data, error });

      if (error) {
        console.error('User authentication failed:', error);
        return { error };
      }

      if (!data.user) {
        console.error('No user returned from auth');
        return { error: { message: 'Authentication failed - no user returned' } };
      }

      // Optional: Verify user has a profile (but don't block login if they don't)
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();

      console.log('User profile check:', { userProfile, profileError });

      // Even if profile doesn't exist, allow login to proceed
      // The profile might be created by the trigger
      console.log('User login successful');
      return { error: null };

    } catch (err) {
      console.error('User login exception:', err);
      return { error: err };
    }
  };


  const adminSignIn = async (email: string, password: string, division: string, accessCode: string) => {
    console.log('Admin login attempt:', { email, division });
    
    try {
      // First, authenticate with Supabase - just like user login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Admin auth response:', { data, error });

      if (error) {
        console.error('Admin authentication failed:', error);
        return { error };
      }

      if (!data.user) {
        console.error('No user returned from auth');
        return { error: { message: 'Authentication failed - no user returned' } };
      }

      // Now check if admin profile exists (check by user ID only, not division)
      console.log('Checking admin profile for user:', data.user.id);
      
      const { data: adminProfile, error: profileError } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();

      console.log('Admin profile query result:', { adminProfile, profileError });

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Profile query error:', profileError);
        await supabase.auth.signOut();
        return { error: profileError };
      }

      if (!adminProfile) {
        console.error('Admin profile not found');
        await supabase.auth.signOut();
        return { 
          error: { 
            message: 'Admin credentials not found. Please contact your administrator.' 
          } 
        };
      }

      console.log('Admin login successful:', adminProfile);
      return { error: null };
      
    } catch (err) {
      console.error('Admin login exception:', err);
      await supabase.auth.signOut();
      return { error: err };
    }
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
    
    adminSignIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
