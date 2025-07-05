import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/userSlice'

function RequireAuth({ children }) {
  const token = useSelector(state => state.user.token)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token || !user || !user.username) {
      dispatch(logout())
    }
  }, [token, user, dispatch])

  if (!token || !user || !user.username) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RequireAuth
