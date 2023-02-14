import { configureStore } from '@reduxjs/toolkit'
import changeReducer from './Slices/changeSlice'
import GetReducer from './Slices/GetSlice'
import RegisterReducer from './Slices/RegisterSlice'
import AuthReducer from './Slices/userLogin'

export const store = configureStore({
  reducer: {
    data: GetReducer,
    register: RegisterReducer,
    auth: AuthReducer,
    change: changeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
