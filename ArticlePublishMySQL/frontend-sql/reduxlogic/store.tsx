import { configureStore } from '@reduxjs/toolkit'
import ArticleReducer from './Slices/ArticleSlice'
import LoginReducer from './Slices/LoginSlice'
import MyArtReducer from './Slices/MyArticles'
import RegistrReducer from './Slices/RegistrSlice'
import RoutingReducer from './Slices/RoutingSlice'

export const store = configureStore({
  reducer: {
    routing: RoutingReducer,
    artdata: ArticleReducer,
    reg: RegistrReducer,
    auth: LoginReducer,
    myart: MyArtReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
