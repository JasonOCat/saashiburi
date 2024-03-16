import Navbar from "src/core/components/Navbar";
import Meta from "src/core/components/Meta";
import {useRouter} from "next/router";


const hideNavbatPages = ['/success']
export default function AppLayout({children}) {
  const router = useRouter();
  const hideNavbar = hideNavbatPages.includes(router.asPath)
  return (
    <>
      <Meta/>
      {hideNavbar ? null : <Navbar/>}
      {children}
    </>
  )

}
