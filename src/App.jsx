import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import RegisterPage from './pages/RegisterPage'
import UserPage from './pages/UserPage'
import Layout from './layouts/Layout'
import RequireAuth from './components/RequireAuth'
import ConfirmBox from './components/UI/ConfirmBox'
import { useSelector, useDispatch } from 'react-redux'
import { logout, hideLogoutConfirm } from './redux/userSlice'
import BoardsList from './components/BoardsList'


function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)
  const showConfirm = useSelector(state => state.user.showConfirm)

  const confirmLogout = () => {
    dispatch(hideLogoutConfirm())
    dispatch(logout())
  }

  return (
    <>
      {showConfirm && (
        <ConfirmBox
          message="Do you want to log out?"

          onConfirm={confirmLogout}
          onCancel={() => dispatch(hideLogoutConfirm())}
        />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/register" element={token ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
        <Route element={<RequireAuth><Layout /></RequireAuth>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/:boardId" element={<DashboardPage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
