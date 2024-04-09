import Link from "next/link";
import {SITE_URL} from "@/utils";
import Logo from "@/app/_components/logo";

export default function Navbar() {
  // const session = useSession();
  // const supabaseClient = useSupabaseClient();

  function signOut() {
    // supabaseClient.auth.signOut();
  }

  async function onManageBilling() {
    const response = await fetch(`${SITE_URL}/api/manage-billing`);
    const data = await response.json();

    if (data) {
      window.location.href = data.url;
    }

  }

  return (
    <div className="nav-container border-b-2 border-black">
      <Link href="/public">
        <Logo/>
      </Link>

      {false ? (
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
