import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'
import orderReducer from './slices/buyingSlice'

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
