import {SessionContextProvider} from "@supabase/auth-helpers-react";

import "src/styles/globals.css";
import AppLayout from "src/core/layouts/App";
import {createBrowserSupabaseClient} from "@supabase/auth-helpers-nextjs";
import {useState} from "react";



export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  return (
    // doc supabase auth helpers : https://supabase.com/docs/guides/auth/auth-helpers/nextjs deprecated, use cookie now
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}>
      <AppLayout>
        <Component {...pageProps}/>
      </AppLayout>
    </SessionContextProvider>
  )

}
