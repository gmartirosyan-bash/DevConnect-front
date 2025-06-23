import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RequireAuth({ children }) {
  const token = useSelector(state => state.user.token)
  const user = useSelector(state => state.user.user)

  if (!token || !user) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default RequireAuth
