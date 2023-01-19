import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const stateSlice = createSlice({
  name: 'states',
  initialState,
  reducers: {
    nextStep: (states) => {
      states.value += 1
    },
    backStep: (states) => {
      states.value -= 1
    },
    setState: (states, action) => {
      states.value = action.payload
    },
  },
})

export default stateSlice.reducer
export const { nextStep, backStep, setState } = stateSlice.actions
