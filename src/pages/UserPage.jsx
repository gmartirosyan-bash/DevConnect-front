import { useState } from 'react'
import usersApi from '../api/users'
import handleApiError from '../utils/handleApiError'
import { X, Check } from 'lucide-react'
import CustomAlert from '../components/UI/CustomAlert'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, logout } from '../redux/userSlice'
import { setAlertMsg } from '../redux/uiSlice'

function UserPage() {
  const token = useSelector(state => state.user.token)
  const user = useSelector(state => state.user.user)
  const alertMsg = useSelector(state => state.ui.alertMsg)

  const [newUsername, setNewUsername] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const dispatch = useDispatch()

  const handleUserEdit = async (e, arg) => {
    e.preventDefault()
    try {
      if (arg === 'username') {
        await usersApi.editUser(user.id, { username: newUsername }, token)
        const updatedUser = { ...user, username: newUsername }
        dispatch(setUser(updatedUser))
        setNewUsername('')
      }
      else if (arg === 'email') {
        await usersApi.editUser(user.id, { email: newEmail }, token)
        const updatedUser = { ...user, email: newEmail }
        dispatch(setUser(updatedUser))
        setNewEmail('')
      }
    }
    catch (err) {
      const message = handleApiError(err, 'Failed to change email or username. Please try again')
      dispatch(setAlertMsg(message))
    }
  }

  const handleClose = (arg) => {
    if (arg === 'username')
      setNewUsername('')
    if (arg === 'email')
      setNewEmail('')
  }

  const onDelete = async () => {
    try {
      await usersApi.deleteUser(user.id, token)
      dispatch(logout())
    }
    catch (err) {
      const message = handleApiError(err, 'Failed to delete the user. Please try again')
      dispatch(setAlertMsg(message))
    }
  }

  return (
    <div className="h-full bg-gradient-to-t from-green-950 to-green-900 text-neutral-200 px-6 py-8">
      {alertMsg && (
        <CustomAlert message={alertMsg} onClose={() => dispatch(setAlertMsg(''))} />
      )}
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-gradient-to-r
          from-green-700 to-green-950
          pt-20 flex justify-between items-center"
        >
          <div className="absolute left-20 w-24 h-24 rounded-full bg-green-800 flex items-center justify-center text-4xl text-neutral-200 font-medium border-1 border-black">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="absolute right-20">
            <h1 className="text-3xl font-normal mb-2 text-neutral-300">{user.username}</h1>
          </div>
        </div>
        <div className="bg-neutral-800 p-8"></div>
        <div className="mt-10 text-lg text-neutral-300 ml-2">About you</div>
        <div className="mt-2 mb-7 py-2 px-5 bg-neutral-800">
          <form
            className="my-4 max-w-48"
            onSubmit={e => handleUserEdit(e, 'username')}
          >
            <label htmlFor="email" className="block">
              Username:
              {' '}
              {user.username}
            </label>
            <input
              value={newUsername}
              required
              onChange={e => setNewUsername(e.target.value)}
              className="focus:outline-none focus:border-green-400 border border-neutral-500 rounded-sm p-1 mt-1 text-white placeholder-neutral-400 outline-green-400"
              id="username"
              placeholder={user.username}
              type="text"
            />
            <div className="text-right mt-1">
              <button
                className="border-neutral-500 border-1 text-neutral-300 bg-green-950
                hover:cursor-pointer hover:bg-green-900
                rounded-sm active:bg-green-800 mr-1 p-1"
                type="submit"
              >
                <Check size={15} />
              </button>
              <button
                className="border-neutral-500 border-1 text-neutral-300 bg-transparent
                hover:cursor-pointer hover:bg-red-800 active:bg-red-700 rounded-sm p-1"
                type="button"
                onClick={() => handleClose('username')}
              >
                <X size={15} />
              </button>
            </div>
          </form>
          <form
            className="my-4 max-w-48"
            onSubmit={e => handleUserEdit(e, 'email')}
          >
            <label htmlFor="email" className="block">
              Email:
              {' '}
              {user.email}
            </label>
            <input
              value={newEmail}
              required
              onChange={e => setNewEmail(e.target.value)}
              className="focus:outline-none focus:border-green-400 border-neutral-500 border rounded-sm p-1 mt-1 text-white placeholder-neutral-400 outline-green-400"
              id="email"
              placeholder={user.email}
              type="email"
            />
            <div className="text-right mt-1">
              <button
                className="border-neutral-500 border-1 text-neutral-300 bg-green-950
                  hover:cursor-pointer hover:bg-green-900
                  rounded-sm active:bg-green-800 mr-1 p-1"
                type="submit"
              >
                <Check size={15} />
              </button>
              <button
                className="border-neutral-500 border-1 text-neutral-300 bg-transparent
                  hover:cursor-pointer hover:bg-red-800 active:bg-red-700 rounded-sm p-1"
                type="button"
                onClick={() => handleClose('email')}
              >
                <X size={15} />
              </button>
            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <h3 className="text-lg text-red-400 ml-2">Danger Zone</h3>
        <div className="mt-6 border-t bg-neutral-800 py-4 px-4 border-neutral-700">
          {!showConfirm
            ? (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="text-md hover:cursor-pointer text-red-500 hover:text-red-300"
                >
                  Delete Account
                </button>
              )
            : (
                <div className="space-y-2">
                  <p className="text-sm text-red-400 mt-2">This action is permanent. Are you sure?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={onDelete}
                      className="bg-red-700 hover:cursor-pointer hover:bg-red-600 px-4 py-1.5 text-sm rounded-md mt-2"
                    >
                      Yes, delete
                    </button>
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="text-sm text-neutral-400 hover:cursor-pointer hover:text-neutral-200 mt-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
        </div>
      </div>
    </div>
  )
}

export default UserPage
