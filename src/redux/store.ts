import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import dashboardReducer from './dashboardSlice'
import uiSlice from './uiSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    ui: uiSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
