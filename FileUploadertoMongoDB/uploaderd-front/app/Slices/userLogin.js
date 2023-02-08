import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginUser = createAsyncThunk(
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
  status: '',
  userLogin: { email: '', password: '' },
  userData: { email: '', password: '' },
  dataStatus: false,
  data: null,
  errorCase: '',
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authPass: (state, action) => {
      state.userLogin.password = action.payload
    },
    authEmail: (state, action) => {
      state.userLogin.email = action.payload
    },
    logOff: (state, action) => {
      state.dataStatus = false
      state.data = null
      state.userData = { email: '', password: '' }
      state.userLogin = { email: '', password: '' }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.data = null
        state.dataStatus = false
        state.errorCase = ''
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.userData = action.payload
        state.errorCase = ''
        state.dataStatus = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errorCase = action.payload
        state.status = 'rejecter'
        state.data = null
        state.dataStatus = false
      })
  },
})

export const { authEmail, authPass, logOff } = AuthSlice.actions
export default AuthSlice.reducer
