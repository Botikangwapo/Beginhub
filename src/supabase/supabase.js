import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gdolpfynhestyhiwxstz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdkb2xwZnluaGVzdHloaXd4c3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MDExNDMsImV4cCI6MjA5NTA3NzE0M30.DHnF8dHbKwLrbfpJqwxy53RT1WXJwAT8GxhtbkhtST4'

export const supabase = createClient(supabaseUrl, supabaseKey)