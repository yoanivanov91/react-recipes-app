import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import styles from "../assets/css/Layout.module.css"

function Layout() {
  return (
    <>
    <div className={styles.pageContainer + ' container'}>
        <Header />
        <main>
            <Outlet />
        </main>
        <div className={styles.footerContainer}>
            <Footer />
        </div>
    </div>
    </>
  )
}

export default Layout