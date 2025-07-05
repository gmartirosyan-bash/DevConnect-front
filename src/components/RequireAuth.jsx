import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/userSlice'

function RequireAuth({ children }) {
  const token = useSelector(state => state.user.token)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  if (!token || !user || !user.username) {
    dispatch(logout())
    return <Navigate to="/login" replace />
  }
  return children
}

export default RequireAuth
