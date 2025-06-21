import Topbar from "../components/Topbar"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <>
      <Topbar />
      <Outlet />
    </>
  )
}
