import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer from './Slices/auth'
import changeReducer from './Slices/change'
import myReducer from './Slices/dataSlice'
import ordersReducer from './Slices/ordersSlice'
import productReducer from './Slices/productSlice'

export const store = configureStore({
  reducer: {
    states: myReducer,
    auth: authReducer,
    change: changeReducer,
    product: productReducer,
    order: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
