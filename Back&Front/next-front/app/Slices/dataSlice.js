import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: false,
  userdata: { username: '', email: '', password: '' },
  userLogin: { email: '', password: '' },
  errorCase: '',
}
export const mySlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getName: (state, action) => {
      state.userdata.username = action.payload
    },
    getEmail: (state, action) => {
      state.userdata.email = action.payload
    },
    getPass: (state, action) => {
      state.userdata.password = action.payload
    },
    serverOk: (state, action) => {
      state.status = action.payload
    },
    loginEmail: (state, action) => {
      state.userLogin.email = action.payload
    },
    loginPass: (state, action) => {
      state.userLogin.password = action.payload
    },
    setError: (state, action) => {
      state.errorCase = action.payload
    },
  },
})

export const {
  setError,
  loginEmail,
  loginPass,
  getEmail,
  getName,
  getPass,
  serverOk,
} = mySlice.actions
export default mySlice.reducer
