import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { KnownError } from './LoginSlice'
import { AxiosError } from 'axios'
import { RejectedActionFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers'

export const getMyArt = createAsyncThunk(
  '/get/myart',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/getmyart/${token}`
      )
      if (response.data) {
        console.log(response.data)
        return response.data
      }
    } catch (err) {
      const error: AxiosError<KnownError> = err as any
      if (error.response?.data) {
        return rejectWithValue(error.response.data.message)
      }
    }
  }
)

export interface myArtInterface {
  myArticles: [myOneArticle]
}

export interface myOneArticle {
  id: number
  author: string
  articleName: string
  articleText: string
}

const initialState: myArtInterface = {
  myArticles: [{ id: 0, author: '', articleName: '', articleText: '' }],
}

export const MyArtSlice = createSlice({
  name: 'myart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyArt.pending, (state) => {}),
      builder.addCase(getMyArt.fulfilled, (state, action: any) => {
        state.myArticles = action.payload
      }),
      builder.addCase(getMyArt.rejected, (state) => {})
  },
})

export const {} = MyArtSlice.actions

export default MyArtSlice.reducer
