import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, LayoutDashboard, Settings, Users, LogOut } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice'
import ConfirmBox from '../components/UI/ConfirmBox'
import { RootState, AppDispatch } from '../redux/store'

function Topbar() {
  const user = useSelector((state: RootState) => state.user.user)

  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)

  const menuRef = useRef<HTMLDivElement | null>(null)
  
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (menuOpen) {
      const handleClickOutside = (e: MouseEvent): void => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          setMenuOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [menuOpen])

  if (!user) return null

  return (
    <div className="flex items-center justify-between p-2 bg-neutral-800 text-white">
      {showConfirm && (
        <ConfirmBox
          message="Do you want to log out?"
          onConfirm={() => {navigate('/login'); dispatch(logout())}}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <div>
        <Link to="/"><Home size={24} className=" hover:text-blue-400 inline mr-2" /></Link>
        <Link to="/dashboard"><LayoutDashboard className="text-white hover:text-green-400 active:text-green-500 inline" size={24} /></Link>
      </div>
      <div ref={menuRef} className="relative">
        <div onClick={() => setMenuOpen(open => !open)}>
          <div className="w-7 h-7 rounded-full bg-green-800 flex items-center justify-center text-neutral-200 text-sm font-bold hover:cursor-pointer">
            {user.username.charAt(0).toUpperCase()}
          </div>
        </div>
        {menuOpen && (
          <div className="z-10 text-left bg-neutral-800 text-neutral-300 w-80 absolute -right-1.5 top-9.5 rounded-xl overflow-hidden">
            <div className="px-3.5 pt-7 text-neutral-400 font-medium text-xs">
              <h3>ACCOUNT</h3>
            </div>
            <div className="px-3.5 py-2.5 flex items-center gap-2">
              <div className="w-11 h-11 rounded-full bg-green-800 flex items-center justify-center text-lg text-neutral-200 font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3>{user.username}</h3>
                <p className="text-neutral-400 font-light">{user.email}</p>
              </div>
            </div>
            <div className="border-t my-1 mx-2 border-white brightness-40"></div>

            <div>
              <ul>
                <Link to="/user">
                  <li className="px-3.5 py-2.5 hover:cursor-pointer hover:bg-neutral-700 active:bg-neutral-600">
                    <Settings className="inline mr-2" size={20} />
                    User Settings
                  </li>
                </Link>
                <li className="px-3.5 py-2.5 hover:cursor-pointer hover:bg-neutral-700 active:bg-neutral-600" onClick={() => setShowConfirm(true)}>
                  <Users className="inline mr-2" size={20} />
                  Switch accounts
                </li>
                <li className="px-3.5 pt-2.5 pb-4 hover:cursor-pointer hover:bg-neutral-700 active:bg-neutral-600 group" onClick={() => setShowConfirm(true)}>
                  <LogOut className="inline mr-2 group-hover:text-red-800" size={20} />
                  Log out
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Topbar
