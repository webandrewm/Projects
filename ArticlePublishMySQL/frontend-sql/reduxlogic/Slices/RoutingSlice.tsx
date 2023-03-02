import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RoutInterface } from './RoutingInterface'

const initialState: RoutInterface = {
  arcitclestate: false,
  articlelistState: false,
  oneArticleState: false,
  artID: 0
}

export const RoutingSlice = createSlice({
  name: 'routing',
  initialState,
  reducers: {
    setAddArticle: (state) => {
   
      if (state.arcitclestate === false) {
        state.arcitclestate = true
        state. articlelistState = false
        state.oneArticleState =false
      } else {
        state.arcitclestate = false
      }
    },
    setAddList: (state) => {
    
      if (state.articlelistState === false) {
        state.articlelistState = true
        state.arcitclestate = false
        state.oneArticleState =false
      } else {
        state.articlelistState = false
      }
    },
    setToMain: (state) => {
      state.arcitclestate = false
      state.articlelistState = false
      state.oneArticleState =false
    },
    setArtIdForWatch: (state, action: PayloadAction<number>) => {
      state.artID = action.payload
      state.arcitclestate = false
      state.articlelistState = false
      state.oneArticleState = true
    }
  },
})

export const { setAddArticle, setAddList, setToMain, setArtIdForWatch } = RoutingSlice.actions

export default RoutingSlice.reducer
