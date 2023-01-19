import { configureStore } from '@reduxjs/toolkit'
import globalInfoReducer from './Slices.js/FormInfo'
import stateReducer from './Slices.js/States'

export const store = configureStore({
  reducer: {
    states: stateReducer,
    global: globalInfoReducer,
  },
})
