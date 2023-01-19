import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const sendOrders = createAsyncThunk(
  '/order/send',
  async (props, { rejectWithValue }) => {
    await axios.post('http://localhost:4444/Orders', props).catch((e) => {
      throw rejectWithValue(e.response.data.message)
    })
  }
)

const initialState = {
  value: 0,
  status: '',
}

export const ordersSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(sendOrders.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(sendOrders.fulfilled, (state, action) => {
        state.status = 'fulfilled'
      })
      .addCase(sendOrders.rejected, (state, action) => {
        state.status = 'rejecter'
      })
  },
})

export default ordersSlice.reducer
