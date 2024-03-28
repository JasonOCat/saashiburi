'use client';

import Navbar from "@/app/_components/navbar";
import { usePathname } from "next/navigation";

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
