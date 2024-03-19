import Link from "next/link";
import Logo from "src/core/components/Logo";
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";

export default function Navbar() {
  const session = useSession();
  const supabaseClient = useSupabaseClient();

  function signOut() {
    supabaseClient.auth.signOut();
  }

  return (
    <div className="nav-container border-b-2 border-black">
      <Link href="/">
        <Logo/>
      </Link>

      {session ? (
        <div className="nav-menu">
          <Link href="/products" className="nav-link white">
            <div>Products</div>
          </Link>
          <a className="nav-link border-left white">
            <div>Billing</div>
          </a>
          <div onClick={signOut} className="nav-link black">
            <div>Sign out</div>
          </div>
        </div>
      ) : (
        <div className="nav-menu">
          <Link href="/login" className="nav-link white">
            <div>Login</div>
          </Link>
          <Link href="/products" className="nav-link black">
            <div>Pricing</div>
          </Link>
        </div>
      )}
    </div>

  )

}
