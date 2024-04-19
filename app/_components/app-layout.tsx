'use client';

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/app/_components/navbar"), { ssr: false });

const hideNavbatPages = ['/success']
export default function AppLayout() {
  const pathname = usePathname();
  const hideNavbar = pathname ? hideNavbatPages.includes(pathname) : false
  return (
    <>
      {hideNavbar ? null : <Navbar/>}
    </>
  )

}
