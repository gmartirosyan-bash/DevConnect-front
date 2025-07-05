import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import loginApi from '../api/login'
import handleApiError from '../utils/handleApiError'
import CustomAlert from '../components/UI/CustomAlert'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setToken } from '../redux/userSlice'
import { setAlertMsg } from '../redux/uiSlice'
import { Eye, EyeOff} from 'lucide-react'

function LoginPage() {
  const alertMsg = useSelector(state => state.ui.alertMsg)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password)
      return dispatch(setAlertMsg('All fields must be filled'))

    try {
      const user = await loginApi.login({ email, password })

      dispatch(setToken(user.token))
      dispatch(setUser({ username: user.username, email: user.email, id: user.id }))

      navigate('/dashboard')
    }
    catch (err) {
      const message = handleApiError(err, 'Login failed')
      dispatch(setAlertMsg(message))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 to-green-700 text-white">
      {alertMsg && (
        <CustomAlert message={alertMsg} onClose={() => dispatch(setAlertMsg(''))} />
      )}
      <div className="bg-neutral-900 p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign in to DevConnect</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="example@email.com"
              className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='relative'>
            <label htmlFor="password" className="block mb-1 text-sm font-medium">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="current-password"
              className="w-full px-4 py-2 pr-12 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              className='absolute right-4 top-9 hover:cursor-pointer text-neutral-500 hover:text-neutral-400 transition'
              type='button'
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 hover:cursor-pointer active:bg-green-400 text-white py-2 rounded font-semibold transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-green-200">
          Don't have an account?
          {' '}
          <Link to="/register" className="text-white underline hover:text-green-400">Sign up</Link>
          {' '}
          or
          {' '}
          <Link to="/" className="text-white underline hover:text-green-400">Learn more</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
