
-- First, let's check if there's an existing trigger and update it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_new_admin_user();

-- Create a comprehensive function to handle both regular users and admin users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if this is an admin user
  IF NEW.raw_user_meta_data ->> 'user_type' = 'admin' THEN
    -- Insert into admin_profiles table
    INSERT INTO public.admin_profiles (
      id, 
      email, 
      full_name, 
      division, 
      access_code
    )
    VALUES (
      NEW.id,
      NEW.email,
      NEW.raw_user_meta_data ->> 'full_name',
      NEW.raw_user_meta_data ->> 'division',
      NEW.raw_user_meta_data ->> 'access_code'
    );
  ELSE
    -- Insert into regular profiles table for regular users
    INSERT INTO public.profiles (
      id, 
      email, 
      full_name, 
      phone, 
      address
    )
    VALUES (
      NEW.id,
      NEW.email,
      NEW.raw_user_meta_data ->> 'full_name',
      NEW.raw_user_meta_data ->> 'phone',
      NEW.raw_user_meta_data ->> 'address'
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
