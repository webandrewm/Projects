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
        let { authDone, artID } = state
        Object.assign(state, initialState)
        state.arcitclestate = true
        state.authDone = authDone
        state.artID = artID
      } else {
        state.arcitclestate = false
      }
    },
    setAddList: (state) => {
      if (state.articlelistState === false) {
        let { authDone, artID } = state
        Object.assign(state, initialState)
        state.articlelistState = true
        state.authDone = authDone
        state.artID = artID
      } else {
        state.articlelistState = false
      }
    },
    setToMain: (state) => {
      let { authDone, artID } = state
      Object.assign(state, initialState)
      state.authDone = authDone
      state.artID = artID
    },
    setAddRegister: (state) => {
      if (state.registerState === false) {
        let { authDone, artID } = state
        Object.assign(state, initialState)
        state.authDone = authDone
        state.artID = artID
        state.registerState = true
      } else {
        state.registerState = false
      }
    },
    setLogin: (state) => {
      if (state.loginState === false) {
        let { authDone, artID } = state
        Object.assign(state, initialState)
        state.authDone = authDone
        state.artID = artID
        state.loginState = true
      } else {
        state.loginState = false
      }
    },
    setMyArticles: (state) => {
      if (state.myArticlesState === false) {
        let { authDone, artID } = state
        Object.assign(state, initialState)
        state.authDone = authDone
        state.artID = artID
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
      let { authDone, artID } = state
      Object.assign(state, initialState)
      state.authDone = authDone
      state.artID = artID
      state.registerSuccess = true
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
