import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const changePassword = createAsyncThunk(
  '/auth/changepass',
  async (props, { rejectWithValue }) => {
    return await axios
      .patch('http://localhost:4444/auth/changepass', props)
      .then((res) => res.data.message)
      .catch((err) => {
        throw rejectWithValue(err.response.data.message)
      })
  }
)

const initialState = {
  status: false,
  oldPass: '',
  newPass: '',
  confirmPass: '',
  responseChange: '',
}
export const changeSlice = createSlice({
  name: 'change',
  initialState,
  reducers: {
    getOldPass: (state, actions) => {
      state.oldPass = actions.payload
    },
    getNewPass: (state, actions) => {
      state.newPass = actions.payload
    },
    getConfirmPass: (state, actions) => {
      state.confirmPass = actions.payload
    },
    clearResponse: (state) => {
      state.responseChange = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.status = 'loading'
        state.responseChange = ''
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.responseChange = action.payload
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = 'rejected'
        state.responseChange = action.payload
      })
  },
})

export const { clearResponse, getConfirmPass, getNewPass, getOldPass } =
  changeSlice.actions
export default changeSlice.reducer
