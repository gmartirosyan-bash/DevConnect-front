import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')),
  showConfirm: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    setToken(state, action) {
      state.token = action.payload
      localStorage.setItem('token', action.payload)
    },
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    showLogoutConfirm(state) {
      state.showConfirm = true
    },
    hideLogoutConfirm(state) {
      state.showConfirm = false
    },
  },
})

export const {
  setUser,
  logout,
  setToken,
  showLogoutConfirm,
  hideLogoutConfirm,
} = userSlice.actions

export default userSlice.reducer
