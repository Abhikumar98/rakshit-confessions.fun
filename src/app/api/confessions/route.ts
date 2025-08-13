import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize a Supabase client following the official guide:
// https://supabase.com/docs/guides/api/creating-routes
// We rely on environment variables for flexibility between local and production deployments.
// - `POSTGRES_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY` are the default public keys.
// - When executing on the server you may prefer the service-role key (`SUPABASE_SERVICE_ROLE_KEY`).
// NOTE: These variables must be configured in the Vercel/Supabase project settings.
const supabaseUrl = process.env.POSTGRES_URL ?? '';
const supabaseKey =
  process.env.ANON_KEY ?? ""

if (!supabaseUrl || !supabaseKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase environment variables are missing. Please set POSTGRES_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY.'
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const { confession } = await request.json();

    // Persist the new confession to the database using Supabase
    const { data, error } = await supabase
      .from('confessions')
      .insert([{ confession }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error while handling confession:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save confession' },
      { status: 500 }
    );
  }
}
