import { configureStore } from '@reduxjs/toolkit'
import courseReducer from './slides/courseSlide'
import userReducer from './slides/userSlide'

export const store = configureStore({
  reducer: {
    course: courseReducer,
    user: userReducer,
  },
})