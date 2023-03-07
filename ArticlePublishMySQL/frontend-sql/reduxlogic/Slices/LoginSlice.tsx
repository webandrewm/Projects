import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { initialLogin, LoginInterface, ResponeServer } from './LoginInterface'

export const getLogin = createAsyncThunk(
  '/login',
  async (data: LoginInterface, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/authme', data)
      const message: string = response.data.message
      const token: string = response.data.token
      if (message) {
        return { message: message, token: token }
      }
    } catch (err) {
      const error: AxiosError<KnownError> = err as any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message)
      }
    }
  }
)
export type KnownError = {
  message: string
}

const initialState: initialLogin = {
  email: '',
  password: '',
  responseLogin: { message: '', token: '' },
}

export const RegistrSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    authPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
    resetLogin: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getLogin.pending, (state) => {}),
      builder.addCase(getLogin.fulfilled, (state, action) => {
        if (action.payload) {
          state.responseLogin = action.payload
        }
      }),
      builder.addCase(getLogin.rejected, (state, action: any) => {
        state.responseLogin.message = action.payload
      })
  },
})

export const { resetLogin, authPassword, authEmail } = RegistrSlice.actions

export default RegistrSlice.reducer
