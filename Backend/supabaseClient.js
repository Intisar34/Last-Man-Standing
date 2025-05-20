import { createClient } from '@supabase/supabase-js';


const url = 'https://ldtmfmmcmwgaxrrjttzi.supabase.co';
// Anon key
const password = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdG1mbW1jbXdnYXhycmp0dHppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NTQwNTgsImV4cCI6MjA2MzEzMDA1OH0.hJmn-xILiChZJNLf1J_CDFHI4wG3Ihff6pRlGuxQCAg';

export const supabase = createClient(url, password);
