import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  domen: '',
  position: { x: 38.907132, y: -77.036546 },
  data: {},
  status: '',
}

export const getData = createAsyncThunk('data/getData', async (domen) => {
  const res = await fetch(`http://ip-api.com/json/${domen}`)
  const response = await res.json()
  return response
})

export const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    SetPosition: (state, action) => {
      state.position.x = action.payload.x
      state.position.y = action.payload.y
    },
    getDomen: (state, action) => {
      state.domen = action.payload
    },
  },
  extraReducers: {
    [getData.fulfilled]: (state, action) => {
      if (action.payload.status !== 'fail') {
        state.data = action.payload
        state.position.x = action.payload.lat
        state.position.y = action.payload.lon
        state.status = 'fulfilled'
      }
    },
  },
})

export default positionSlice.reducer
export const { SetPosition, getDomen } = positionSlice.actions
