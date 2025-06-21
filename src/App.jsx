import { useState } from 'react'
import { AppContext } from './context/AppContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import RegisterPage from './pages/RegisterPage'
import UserPage from './pages/UserPage'
import Layout from './layouts/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import ConfirmBox from './components/ConfirmBox'

function App() {
  const token = localStorage.getItem('token')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [showConfirm, setShowConfirm] = useState(false)

  const confirmLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setShowConfirm(false)
  }
  const handleLogout = () => {
    setShowConfirm(true)
  }

  return (
    <AppContext.Provider value={{ handleLogout, confirmLogout, token, user, setUser }}>
      {showConfirm && (
        <ConfirmBox
          message="Do you want to log out?"
          onConfirm={confirmLogout}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/register" element={token ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/dashboard/:boardId" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppContext.Provider>
  )
}

export default App
