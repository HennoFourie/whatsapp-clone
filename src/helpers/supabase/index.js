import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ufrcuuwohvyuwrnuhght.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmcmN1dXdvaHZ5dXdybnVoZ2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUzODUwNjcsImV4cCI6MTk3MDk2MTA2N30.Ond9KHp5U1QXj7w0Sog9HflDViOar1rka5CJPtSdbHU"
);
