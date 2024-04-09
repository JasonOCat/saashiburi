import Link from "next/link";
import {SITE_URL} from "@/utils";
import Logo from "@/app/_components/logo";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { createFrontendClient } from "@/utils/supabase/client";

export default async function Navbar() {
  // const session = useSession();
  const supabase = createFrontendClient();

  function signOut() {
    supabase.auth.signOut();
  }

  const { data , error } = await supabase.auth.getUser()

  async function onManageBilling() {
    const response = await fetch(`${SITE_URL}/api/manage-billing`);
    const data = await response.json();

    if (data) {
      window.location.href = data.url;
    }
  }

  return (
    <div className="nav-container border-b-2 border-black">
      <Link href="/">
        <Logo/>
      </Link>

      {data.user != null ? (
        <div className="nav-menu">
          <Link href="/products" className="nav-link white">
            <div>Products</div>
          </Link>
          <a onClick={onManageBilling} className="nav-link border-left white">
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
