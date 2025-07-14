import Topbar from "./Topbar"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className="h-screen flex flex-col">
      <Topbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
