import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import loginApi from '../api/login'
import usersApi from '../api/users'
import handleApiError from '../utils/handleApiError'
import CustomAlert from '../components/CustomAlert'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setToken } from '../redux/userSlice'
import { setAlertMsg } from '../redux/uiSlice'


function RegisterPage() {
  const alertMsg = useSelector(state => state.ui.alertMsg)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== repeatPassword)
      return dispatch(setAlertMsg('Passwords don\'t match'))
    if (!password || !email || !username)
      return dispatch(setAlertMsg('Every field must be filled'))

    try {
      await usersApi.createUser({ username, email, password })
      const user = await loginApi.login({ email, password })

      dispatch(setToken(user.token))
      dispatch(setUser({ username: user.username, email: user.email, id: user.id}))

      navigate('/dashboard')
    }
    catch (err) {
      const message = handleApiError(err, 'Registration failed')
      dispatch(setAlertMsg(message))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 to-green-700 text-white">
      {alertMsg && (
        <CustomAlert message={alertMsg} onClose={() => dispatch(setAlertMsg(''))} />
      )}
      <div className="bg-neutral-900 p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 text-sm font-medium">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              autoComplete="username"
              placeholder="Username"
              className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

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

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="new-password"
              className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="repeatPassword" className="block mb-1 text-sm font-medium">Repeat Password</label>
            <input
              id="repeatPassword"
              type="password"
              name="repeatPassword"
              autoComplete="new-password"
              className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 hover:cursor-pointer active:bg-green-400 text-white py-2 rounded font-semibold transition-colors"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-green-200">
          Already have an account?
          {' '}
          <Link to="/login" className="text-white underline hover:text-green-400">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
