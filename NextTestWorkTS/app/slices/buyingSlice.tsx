import { createSlice } from '@reduxjs/toolkit'
import { prodInter } from '../apiInterface'
import { current } from '@reduxjs/toolkit'

interface interForSlice {
  data: prodInter[]
  prodQuantity: number
  convert: number
  buyingData: prodInter[]
  pageState: boolean
  totalQuantity: number
  heardStyle: boolean
}
const initialState = {
  data: [],
  prodQuantity: 1,
  convert: 70,
  buyingData: [],
  pageState: false,
  totalQuantity: 0,
  heardStyle: false,
} as interForSlice

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    goingToMainPage: (state) => {
      if (state.pageState === false) {
        state.pageState = true
      } else {
        state.pageState = false
      }
    },
    pushDatatoArea: (state, action) => {
      let datax = state.buyingData.find((item) => item.id === action.payload.id)
      if (!datax) {
        state.buyingData.push(action.payload)
      } else {
        state.buyingData.map((item) => {
          if (current(item) === current(datax)) {
            item.count += 1
            return item
          }
        })
      }
    },
    getTotalQuantity: (state) => {
      state.totalQuantity = state.buyingData.reduce(
        (sum, current) => sum + current.count,
        0
      )
    },
    changeColorHeart: (state, action) => {
      if (state.data) {
        state.data.map((item) => {
          if (item.id === action.payload) {
            if (!item.ratingValue) {
              item.ratingValue = true
              item.rating.count++
            } else {
              item.ratingValue = false
              item.rating.count--
            }
          }
        })
      }
    },
    getData: (state, action) => {
      state.data = action.payload
    },
    changeToRubles: (state) => {
      if (state.data) {
        state.data.map((item) => {
          item.price = item.price * state.convert
        })
      }
    },
    addQuantity: (state, action) => {
      state.data.map((item) => {
        if (item.id === action.payload) {
          item.count++
        }
      })
      state.buyingData.map((item) => {
        if (item.id === action.payload) {
          item.count++
        }
      })
    },
    setCounts: (state) => {
      if (state.data) {
        state.data.map((item) => {
          item.count = 1
        })
      }
    },
    decreaseCount: (state, action) => {
      state.data.map((item) => {
        if (item.id === action.payload) {
          if (item.count > 1) {
            item.count--
          }
        }
      })
      state.buyingData.map((item, index) => {
        if (item.id === action.payload) {
          if (item.count > 1) {
            item.count--
          } else {
            state.buyingData.splice(index, 1)
          }
        }
      })
    },
  },
})

export const {
  addQuantity,
  getData,
  setCounts,
  decreaseCount,
  changeToRubles,
  pushDatatoArea,
  goingToMainPage,
  getTotalQuantity,
  changeColorHeart,
} = orderSlice.actions
export default orderSlice.reducer
