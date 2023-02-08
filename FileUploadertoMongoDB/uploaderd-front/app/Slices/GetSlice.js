import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  fileList: '',
  fileSize: 0,
  elapsedTime: 0,
  status: '',
  percentage: 0,
  errors: '',
  time: 0,
  timer: false,
  oneFileStatus: '',
  statusTimer: 0,
}

export const getSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getFileList: (state, action) => {
      state.fileList = action.payload
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setFileSize: (state, action) => {
      state.fileSize = action.payload / 1048576
    },
    setTime: (state, action) => {
      if (action.payload === 0) {
        state.time = 0
      } else {
        state.time += action.payload
      }
    },
    setTimer: (state, action) => {
      state.timer = action.payload
    },
    setPercentage: (state, action) => {
      state.percentage = action.payload
    },
    setOneFileStatus: (state, action) => {
      state.oneFileStatus = action.payload
    },
    setStatusClear: (state, action) => {
      state.statusTimer = state.statusTimer + action.payload
    },
    loggedOff: (state, action) => {
      state.fileList = action.payload
    },
  },
})

export const {
  setPercentage,
  setTime,
  setTimer,
  setFileSize,
  setStatus,
  getFileList,
  setOneFileStatus,
  setStatusClear,
  loggedOff,
} = getSlice.actions
export default getSlice.reducer
