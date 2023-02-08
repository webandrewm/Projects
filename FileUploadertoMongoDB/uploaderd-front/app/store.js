import { configureStore } from '@reduxjs/toolkit'
import GetReducer from './Slices/GetSlice'
import RegisterReducer from './Slices/RegisterSlice'
import AuthReducer from './Slices/userLogin'

export const store = configureStore({
  reducer: {
    data: GetReducer,
    register: RegisterReducer,
    auth: AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
