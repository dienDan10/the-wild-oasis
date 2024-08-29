import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://snghifqfoeilzovekjso.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZ2hpZnFmb2VpbHpvdmVranNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxNDQ5NDEsImV4cCI6MjAzOTcyMDk0MX0.e3E37Rnje4SKjKc-F_16QMUgmbeU8M5nxm7qPOq8nT0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
