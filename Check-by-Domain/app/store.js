import { configureStore } from '@reduxjs/toolkit'
import positionReducer from './Slices/positionSlice'

export const store = configureStore({
  reducer: {
    pos: positionReducer,
  },
})
