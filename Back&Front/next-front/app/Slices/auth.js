import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUser = createAsyncThunk(
  '/auth/Login',
  async (props, { rejectWithValue }) => {
    const { data } = await axios
      .post('http://localhost:4444/auth/Login', props)
      .catch((e) => {
        throw rejectWithValue(e.response.data.message)
      })

    return data
  }
)

const initialState = {
  userData: { username: '', email: '', createdAt: '' },
  status: 'loading',
  dataStatus: false,
  errorCase: '',
  stateAuth: false,
}

export const authSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setLogOff: (state) => {
      state.userData = { username: '', email: '', createdAt: '' }
      state.dataStatus = false
      state.status = 'loading'
    },
    setErrorCase: (state, action) => {
      state.errorCase = action.payload
    },
    toProfile: (state, action) => {
      state.stateProfile = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
        state.data = null
        state.dataStatus = false
        state.errorCase = ''
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.userData = action.payload
        state.errorCase = ''
        state.dataStatus = true
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.errorCase = action.payload
        state.status = 'rejecter'
        state.data = null
        state.dataStatus = false
      })
  },
})
export const { toProfile, setLogOff } = authSlice.actions
export default authSlice.reducer
