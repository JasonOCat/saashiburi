import Navbar from "src/core/components/Navbar";
import Meta from "src/core/components/Meta";

export default function AppLayout({children}) {
  return (
    <>
      <Meta/>
      <Navbar/>
      {children}
    </>
  )

}
