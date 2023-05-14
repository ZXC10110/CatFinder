import '../styles/globals.css';
import Layout from '../components/layout';
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

export default function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Layout>
        <div class="min-h-[87vh]">
          <Component {...pageProps} />
        </div>
      </Layout>
    </SessionContextProvider>
  );
}
