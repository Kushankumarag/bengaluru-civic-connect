
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
    // Clean up any existing auth state issues
    const cleanupAuthState = () => {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
    };

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
    console.log('Admin signup attempt:', { email, fullName, division, accessCode });
    
    try {
      // Clean up any existing auth state first
      await supabase.auth.signOut();
      
      const redirectUrl = `${window.location.origin}/admin-dashboard`;
      
      const { data, error } = await supabase.auth.signUp({
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
      
      console.log('Admin signup response:', { data, error });
      
      if (error) {
        console.error('Admin signup error:', error);
        return { error };
      }

      // Wait a moment for the trigger to create the admin profile
      if (data.user && !error) {
        console.log('Admin user created, waiting for profile creation...');
        // Give the database trigger time to create the admin profile
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      return { error };
    } catch (err) {
      console.error('Admin signup exception:', err);
      return { error: err };
    }
  };

  const adminSignIn = async (email: string, password: string, division: string, accessCode: string) => {
    console.log('Admin login attempt:', { email, division, accessCode });
    
    try {
      // Clean up any existing auth state first
      await supabase.auth.signOut();
      
      // First, authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Auth response:', { authData, authError });

      if (authError) {
        console.error('Authentication failed:', authError);
        return { error: authError };
      }

      if (!authData.user) {
        console.error('No user returned from auth');
        return { error: { message: 'Authentication failed - no user returned' } };
      }

      // Wait a moment for the session to be established
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Now check if admin profile exists with matching credentials
      console.log('Checking admin profile for user:', authData.user.id);
      
      const { data: adminProfile, error: profileError } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('email', email)
        .eq('division', division)
        .eq('access_code', accessCode)
        .maybeSingle();

      console.log('Admin profile query result:', { adminProfile, profileError });

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Profile query error:', profileError);
        // Sign out the user since validation failed
        await supabase.auth.signOut();
        return { error: profileError };
      }

      if (!adminProfile) {
        console.error('Admin profile not found or credentials mismatch');
        // Sign out the user since validation failed
        await supabase.auth.signOut();
        return { 
          error: { 
            message: 'Admin credentials not found. Please check your division and access code, or sign up first.' 
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
