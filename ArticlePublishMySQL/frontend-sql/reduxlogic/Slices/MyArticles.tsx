import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { KnownError } from './LoginInterface'
import { AxiosError } from 'axios'

export interface deleteOne {
  id: number
  token: string
}

export interface editInterface {
  id: number
  author: string
  articleName: string
  articleText: string
  token: string
}

export interface myArtInterface {
  myArticles: [myOneArticle]
  deleteMessage: { message: string }
}

export interface myOneArticle {
  id: number
  author: string
  articleName: string
}

export const getMyArt = createAsyncThunk(
  '/get/myart',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/getmyart/${token}`
      )
      if (response) {
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

export const deleteOneArticle = createAsyncThunk(
  '/delete/one',
  async (data: deleteOne, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/deleteone/${data.id}/${data.token}`
      )
      if (response.data) {
        return response.data.message
      }
    } catch (err) {
      const error: AxiosError<KnownError> = err as any
      if (error.response?.data) {
        return rejectWithValue(error.response.data.message)
      }
    }
  }
)

export const editOneArticle = createAsyncThunk(
  '/edit/one',
  async (data: editInterface, { rejectWithValue }) => {
    try {
      const response = await axios.patch('http://localhost:5000/editone/', data)
      console.log(response)
    } catch (err) {
      const error: AxiosError<KnownError> = err as any
      if (error.response?.data) {
        return rejectWithValue(error.response.data.message)
      }
    }
  }
)

const initialState: myArtInterface = {
  myArticles: [{ id: 0, author: '', articleName: '' }],
  deleteMessage: { message: '' },
}

export const MyArtSlice = createSlice({
  name: 'myart',
  initialState,
  reducers: {
    resetDeleteMessage: (state) => {
      state.deleteMessage = { message: '' }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyArt.pending, (state) => {}),
      builder.addCase(getMyArt.fulfilled, (state, action) => {
        state.myArticles = action.payload
      }),
      builder.addCase(getMyArt.rejected, (state) => {}),
      builder.addCase(deleteOneArticle.pending, (state) => {}),
      builder.addCase(deleteOneArticle.fulfilled, (state, action) => {
        state.deleteMessage = action.payload
      }),
      builder.addCase(deleteOneArticle.rejected, (state) => {})
  },
})

export const { resetDeleteMessage } = MyArtSlice.actions

export default MyArtSlice.reducer
