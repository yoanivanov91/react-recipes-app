import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import "../assets/css/Layout.css"

function Layout() {
  return (
    <>
    <div className="container page-container">
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>
    </>
  )
}

export default Layout