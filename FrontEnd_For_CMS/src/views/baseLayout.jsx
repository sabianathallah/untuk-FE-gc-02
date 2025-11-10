import { Outlet } from "react-router"
import Navbar from "../component/navbar"
import Footer from "../component/footer"

export default function BaseLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}