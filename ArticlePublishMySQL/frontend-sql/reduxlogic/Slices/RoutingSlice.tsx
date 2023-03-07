import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RoutInterface } from './RoutingInterface'

const initialState: RoutInterface = {
  arcitclestate: false,
  articlelistState: false,
  oneArticleState: false,
  registerState: false,
  loginState: false,
  registerSuccess: false,
  myArticlesState: false,
  authDone: false,
  artID: 0,
}

export const RoutingSlice = createSlice({
  name: 'routing',
  initialState,
  reducers: {
    setAddArticle: (state) => {
      if (state.arcitclestate === false) {
        state.arcitclestate = true
        state.articlelistState = false
        state.oneArticleState = false
        state.registerState = false
        state.registerSuccess = false
        state.loginState = false
        state.myArticlesState = false
      } else {
        state.arcitclestate = false
      }
    },
    setAddList: (state) => {
      if (state.articlelistState === false) {
        state.articlelistState = true
        state.arcitclestate = false
        state.oneArticleState = false
        state.registerState = false
        state.registerSuccess = false
        state.loginState = false
        state.myArticlesState = false
      } else {
        state.articlelistState = false
      }
    },
    setToMain: (state) => {
      state.arcitclestate = false
      state.articlelistState = false
      state.oneArticleState = false
      state.registerSuccess = false
      state.registerSuccess = false
      state.loginState = false
      state.myArticlesState = false
    },
    setAddRegister: (state) => {
      if (state.registerState === false) {
        state.arcitclestate = false
        state.oneArticleState = false
        state.articlelistState = false
        state.registerState = true
        state.registerSuccess = false
        state.loginState = false
        state.myArticlesState = false
      } else {
        state.registerState = false
      }
    },
    setLogin: (state) => {
      if (state.loginState === false) {
        state.arcitclestate = false
        state.oneArticleState = false
        state.articlelistState = false
        state.registerState = false
        state.registerSuccess = false
        state.loginState = true
        state.myArticlesState = false
      } else {
        state.registerState = false
      }
    },
    setMyArticles: (state) => {
      if (state.myArticlesState === false) {
        state.arcitclestate = false
        state.oneArticleState = false
        state.articlelistState = false
        state.registerState = false
        state.registerSuccess = false
        state.myArticlesState = true
      } else {
        state.myArticlesState = false
      }
    },
    setArtIdForWatch: (state, action: PayloadAction<number>) => {
      state.artID = action.payload
      state.arcitclestate = false
      state.articlelistState = false
      state.oneArticleState = true
      state.registerSuccess = false
      state.loginState = false
      state.myArticlesState = false
    },
    successRegister: (state) => {
      state.registerState = false
      state.arcitclestate = false
      state.oneArticleState = false
      state.articlelistState = false
      state.loginState = false
      state.registerSuccess = true
      state.myArticlesState = false
    },
    setAuthDone: (state, action: PayloadAction<boolean>) => {
      state.authDone = action.payload
    },
  },
})

export const {
  setAddRegister,
  setAddArticle,
  setAddList,
  setToMain,
  setArtIdForWatch,
  successRegister,
  setLogin,
  setAuthDone,
  setMyArticles,
} = RoutingSlice.actions

export default RoutingSlice.reducer
