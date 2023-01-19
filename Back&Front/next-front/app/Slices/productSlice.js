import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { current } from '@reduxjs/toolkit'
export const getData = createAsyncThunk(
  '/prod',
  async (props, { rejectWithValue }) => {
    return await axios.get('http://localhost:4444/prod').catch((err) => {
      throw rejectWithValue(err)
    })
  }
)

const initialState = {
  data: '',
  errorCase: '',
  selectedData: [],
  totalQuantity: 0,
  totalPrice: 0,
  adress: '',
  phoneNumber: '',
  desiredDate: '',
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setDesiredDate: (state, action) => {
      state.desiredDate = action.payload
    },
    setAdress: (state, action) => {
      state.adress = action.payload
    },
    setPhone: (state, action) => {
      state.phoneNumber = action.payload
    },
    selectData: (state, action) => {
      let datax = state.selectedData.find(
        (item) => item.id === action.payload.id
      )
      if (!datax) {
        let newObj = action.payload
        newObj.counts = 1
        state.selectedData.push(newObj)
      } else {
        state.selectedData.map((item) => {
          if (current(item) === current(datax)) {
            item.counts += 1
            return item
          }
        })
      }
    },
    getTotalQuantity: (state) => {
      state.totalQuantity = state.selectedData.reduce(
        (sum, current) => sum + current.counts,
        0
      )
    },
    increasCount: (state, action) => {
      let datax = state.selectedData.find(
        (item) => item.id === action.payload.id
      )
      state.selectedData.map((item) => {
        if (current(item) === current(datax)) {
          item.counts += 1
          return item
        }
      })
    },
    getTotalPrice: (state) => {
      state.totalPrice = state.selectedData
        .reduce(
          (sum, current) => (sum = sum + current.price * current.counts),
          0
        )
        .toFixed(2)
    },
    decreaseCount: (state, action) => {
      let datax = state.selectedData.find(
        (item) => item.id === action.payload.id
      )
      state.selectedData.map((item) => {
        if (current(item) === current(datax)) {
          if (item.counts > 1) {
            item.counts -= 1
            return item
          }
        }
      })
    },
    deleteItem: (state, action) => {
      state.selectedData = state.selectedData.filter(
        (item) => item.id !== action.payload
      )
    },
    clearBin: (state) => {
      state.selectedData = []
      state.totalQuantity = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.data = action.payload.data
      })
      .addCase(getData.rejected, (state, action) => {
        state.status = 'rejecter'
        state.errorCase = action.payload
      })
  },
})
export default productSlice.reducer
export const {
  selectData,
  deleteItem,
  increasCount,
  decreaseCount,
  getTotalQuantity,
  getTotalPrice,
  setAdress,
  setPhone,
  setDesiredDate,
  clearBin,
} = productSlice.actions
