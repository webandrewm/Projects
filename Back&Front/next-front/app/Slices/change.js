import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const changePassword = createAsyncThunk(
  '/auth/change',
  async (props, { rejectWithValue }) => {
    console.log(props)
    return await axios
      .patch('http://localhost:4444/auth/change', props)
      .catch((err) => {
        throw rejectWithValue(err.response.data.message)
      })
  }
)

const initialState = {
  value: null,
  status: 'loading',
  currentPass: '',
  oldPass: '',
  oldPassMessage: '',
}

export const changeSlice = createSlice({
  name: 'change',
  initialState,
  reducers: {
    setCurrPass: (state, action) => {
      state.currentPass = action.payload
    },
    setOldPass: (state, action) => {
      state.oldPass = action.payload
    },
    messageReset: (state) => {
      state.oldPassMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.oldPassMessage = action.payload.data.message
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = 'rejecter'
        state.oldPassMessage = action.payload
      })
  },
})
export const { messageReset, setCurrPass, setOldPass } = changeSlice.actions
export default changeSlice.reducer
