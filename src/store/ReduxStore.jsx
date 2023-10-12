import { configureStore } from '@reduxjs/toolkit'
import ProfileReducer from './ProfileReducer'

export const store = configureStore({
  reducer: {
    profile: ProfileReducer,
  },
})
