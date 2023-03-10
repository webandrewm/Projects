import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { ArtInterface, messageResponse, oneArticle } from './ArticleInterface'
import { AxiosError } from 'axios'
import { KnownError } from './LoginInterface'
import { getArtInter } from './ArticleInterface'
import { sendArt } from './ArticleInterface'

export const getArtList = createAsyncThunk(
  '/get/articles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/getall')
      if (response) {
        return response.data as getArtInter
      }
    } catch (err) {
      const error: AxiosError<KnownError> = err as any
      if (error.response?.data) {
        return rejectWithValue(error.response.data.message)
      }
    }
  }
)

export const getOneArt = createAsyncThunk(
  '/get/oneart',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/getone/${id}`)
      if (response.data) {
        return response.data as getArtInter
      }
    } catch (err) {
      if (err) {
        const error: AxiosError<KnownError> = err as any
        if (error.response?.data) {
          return rejectWithValue(error.response.data.message)
        }
      }
    }
  }
)

interface asdfg {
  respones: {
    data: {
      message: string
    }
  }
}

export const searchArticle = createAsyncThunk(
  '/get/search',
  async (articleName: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5000/search/${articleName}`)
      if (res) {
        return res.data as getArtInter
      }
    } catch (err) {
      if (err) {
        const error = err as any
        if (error.response?.data) {
          const resp = error.response.data
          return rejectWithValue(resp)
        }
      }
    }
  }
)

export const sendArticle = createAsyncThunk(
  'send/article',
  async (data: sendArt, { rejectWithValue }) => {
    try {
      const response: messageResponse = await axios.post(
        'http://localhost:5000/artsend',
        data
      )
      if (response) {
        return response as messageResponse
      }
    } catch (err) {
      if (err) {
        const error: AxiosError<KnownError> = err as any

        if (error.response?.data) {
          const resp: messageResponse = error.response.data
          return resp
        }
      }
    }
  }
)

const initialState: ArtInterface = {
  author: '',
  articleName: '',
  articleText: '',
  sendingStatus: '',
  sendingAnswer: { message: '' },
  token: '',
  allArticles: [{ id: 0, author: '', articleName: '', articleText: '' }],
  artLoadingStatus: '',
  artLoadingMessage: {},
}

export const ArticleSlice = createSlice({
  name: 'artdata',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<string>) => {
      state.author = action.payload
    },
    setArtName: (state, action: PayloadAction<string>) => {
      state.articleName = action.payload
    },
    setArtText: (state, action: PayloadAction<string>) => {
      state.articleText = action.payload
    },
    resetAnswer: (state) => {
      state.sendingAnswer = initialState.sendingAnswer
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendArticle.pending, (state) => {
      state.sendingStatus = 'loading'
    }),
      builder.addCase(sendArticle.fulfilled, (state, action) => {
        state.sendingStatus = 'fullfiled'
        state.sendingAnswer = action.payload
      }),
      builder.addCase(sendArticle.rejected, (state) => {
        state.sendingStatus = 'rejected'
      }),
      builder.addCase(getArtList.pending, (state) => {
        state.artLoadingStatus = 'pending'
      }),
      builder.addCase(getArtList.fulfilled, (state, { payload }) => {
        if (payload) {
          state.allArticles = payload
          state.artLoadingStatus = 'fullfilled'
        }
      }),
      builder.addCase(getArtList.rejected, (state, action) => {
        state.artLoadingStatus = 'rejected'
      }),
      builder.addCase(searchArticle.pending, (state) => {
        state.artLoadingStatus = 'pending'
      }),
      builder.addCase(searchArticle.fulfilled, (state, action) => {
        state.artLoadingStatus = 'fullfilled'
        if (action.payload) {
          state.allArticles = action.payload
        }
      }),
      builder.addCase(searchArticle.rejected, (state, action: any) => {
        if (action.payload) {
          state.sendingAnswer = action.payload
          state.allArticles = initialState.allArticles
          state.artLoadingStatus = 'rejected'
        }
      }),
      builder.addCase(getOneArt.pending, (state) => {
        state.artLoadingStatus = 'pending'
      }),
      builder.addCase(getOneArt.fulfilled, (state, { payload }) => {
        state.artLoadingStatus = 'fullfilled'
        payload ? (state.allArticles = payload) : ''
      }),
      builder.addCase(getOneArt.rejected, (state) => {
        state.artLoadingStatus = 'rejected'
      })
  },
})

export const { resetAnswer, setAuthor, setArtName, setArtText } =
  ArticleSlice.actions

export default ArticleSlice.reducer
