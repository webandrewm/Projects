import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { ArtInterface, oneArticle } from './ArticleInterface'

export const getArtList = createAsyncThunk('/get/articles', async () => {
  try {
    const response = await axios.get('http://localhost:5000/getall')
    return response.data
  } catch (err) {
    console.log(err)
    return 'Ошибка'
  }
})

export const getOneArt = createAsyncThunk('/get/oneart', async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:5000/getone/${id}`)
    if (response.data) {
      return response.data
    }
    return
  } catch (err) {
    console.log(err)
  }
})

export const searchArticle = createAsyncThunk(
  '/get/search',
  async (articleName: string) => {
    console.log(articleName)
    try {
      const res = await axios.get(`http://localhost:5000/search/${articleName}`)
      console.log(res)
      if (res.data) {
        return res.data
      }
      return
    } catch (err) {
      if (err) {
        console.log(err)
      }
    }
  }
)

export const sendArticle = createAsyncThunk(
  'send/article',
  async (data: ArtInterface) => {
    try {
      const response: string = await axios.post(
        'http://localhost:5000/artsend',
        data
      )
      if (response) {
        return response
      } else {
        return 'Ошибка!'
      }
    } catch (err) {
      if (err) {
        console.log(err)
      }
    }
  }
)

const initialState: ArtInterface = {
  author: '',
  articleName: '',
  articleText: '',
  sendingStatus: '',
  sendingAnswer: '',
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
      builder.addCase(getArtList.fulfilled, (state, action) => {
        state.allArticles = action.payload
        state.artLoadingStatus = 'fullfilled'
      }),
      builder.addCase(getArtList.rejected, (state, action) => {
        state.artLoadingStatus = 'rejected'
      }),
      builder.addCase(searchArticle.pending, (state) => {
        state.artLoadingStatus = 'pending'
      }),
      builder.addCase(searchArticle.fulfilled, (state, action) => {
        state.artLoadingStatus = 'fullfilled'
        state.allArticles = action.payload
      }),
      builder.addCase(searchArticle.rejected, (state, action) => {
        state.artLoadingStatus = 'rejected'
      }),
      builder.addCase(getOneArt.pending, (state) => {
        state.artLoadingStatus = 'pending'
      }),
      builder.addCase(getOneArt.fulfilled, (state, action) => {
        state.artLoadingStatus = 'fullfilled'
        state.allArticles = action.payload
      }),
      builder.addCase(getOneArt.rejected, (state, action) => {
        state.artLoadingStatus = 'rejected'
      })
  },
})

export const { setAuthor, setArtName, setArtText } = ArticleSlice.actions

export default ArticleSlice.reducer
