
-- Create complaints table
CREATE TABLE public.complaints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'pending',
  location_address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  image_url TEXT,
  division TEXT NOT NULL,
  assigned_admin_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create admin_profiles table for admin-specific data
CREATE TABLE public.admin_profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  division TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  access_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_actions table for audit logs
CREATE TABLE public.admin_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES auth.users(id) NOT NULL,
  complaint_id UUID REFERENCES public.complaints(id),
  action_type TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;

-- RLS policies for complaints
CREATE POLICY "Admins can view division complaints" 
  ON public.complaints 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles 
      WHERE id = auth.uid() AND division = complaints.division
    )
  );

CREATE POLICY "Admins can update division complaints" 
  ON public.complaints 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_profiles 
      WHERE id = auth.uid() AND division = complaints.division
    )
  );

CREATE POLICY "Users can insert their own complaints" 
  ON public.complaints 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own complaints" 
  ON public.complaints 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- RLS policies for admin_profiles
CREATE POLICY "Admins can view their own profile" 
  ON public.admin_profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Admins can update their own profile" 
  ON public.admin_profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- RLS policies for admin_actions
CREATE POLICY "Admins can view their own actions" 
  ON public.admin_actions 
  FOR SELECT 
  USING (auth.uid() = admin_id);

CREATE POLICY "Admins can insert their own actions" 
  ON public.admin_actions 
  FOR INSERT 
  WITH CHECK (auth.uid() = admin_id);
