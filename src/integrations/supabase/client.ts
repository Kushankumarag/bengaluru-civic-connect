// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fdbqixronpraiuwcgypb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkYnFpeHJvbnByYWl1d2NneXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDgzNDQsImV4cCI6MjA2NTQ4NDM0NH0.FjeLRNVxWX64kcE7jwTocg9abjDX0-69W-K3Jw_b0DQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);