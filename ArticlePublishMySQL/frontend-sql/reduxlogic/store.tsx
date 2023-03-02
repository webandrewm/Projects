import { configureStore } from '@reduxjs/toolkit'
import ArticleReducer from './Slices/ArticleSlice'
import RoutingReducer from './Slices/RoutingSlice'

export const store = configureStore({
  reducer: {
    routing: RoutingReducer,
    artdata: ArticleReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
