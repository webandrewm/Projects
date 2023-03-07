import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RegistrInterface } from './RegistrInterface'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

export const getRegistration = createAsyncThunk(
  '/registr',
  async (data: RegistrInterface, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/registr', data)
      const message: string = response.data.message
      const token: string = response.data.token
      console.log(token)
      if (message) {
        console.log(message)
        return { message: message, token: token }
      }
    } catch (err) {
      const error: AxiosError<KnownError> = err as any
      if (error.response?.data) {
        return rejectWithValue(error.response.data.message)
      }
    }
  }
)
export type KnownError = {
  message: string
}

const initialState: RegistrInterface = {
  email: '',
  password: '',
  confirmPass: '',
  response: { message: '', token: '' },
}

export const RegistrSlice = createSlice({
  name: 'reg',
  initialState,
  reducers: {
    getEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    getPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
    getConfirmPass: (state, action: PayloadAction<string>) => {
      state.confirmPass = action.payload
    },
    resetRegistr: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getRegistration.pending, (state) => {}),
      builder.addCase(getRegistration.fulfilled, (state, action) => {
        if (action.payload) {
          state.response = action.payload
        }
      }),
      builder.addCase(getRegistration.rejected, (state, action: any) => {
        state.response = action.payload
      })
  },
})

export const { resetRegistr, getPassword, getEmail, getConfirmPass } =
  RegistrSlice.actions

export default RegistrSlice.reducer
