import { configureStore } from '@reduxjs/toolkit'
import GetReducer from './Slices/GetSlice'

export const store = configureStore({
  reducer: {
    data: GetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
