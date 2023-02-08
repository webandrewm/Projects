import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const fetchDataFile = createAsyncThunk('download', async (props) => {
  await axios
    .get(`http://localhost:4444/uploadsone/${props.id}/${props.filename}`)
    .catch((e) => {
      console.log(e)
    })
})

const initialState = {
  data: null,
}

export const downloadSlice = createSlice({
  name: 'fetch',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataFile.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchDataFile.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.data = action.payload
      })
      .addCase(fetchDataFile.rejected, (state, action) => {
        state.status = 'rejecter'
      })
  },
})

export default downloadSlice.reducer
