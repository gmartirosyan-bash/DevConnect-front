import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  alertMsg: '',
  loading: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setAlertMsg(state, action) {
      state.alertMsg = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    }
  }
})

export const {
  setAlertMsg,
  setLoading
} = uiSlice.actions

export default uiSlice.reducer