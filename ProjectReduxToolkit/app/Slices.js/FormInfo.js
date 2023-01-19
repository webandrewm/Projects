import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  phoneNumber: '',
  planTime: false,
  planArc: { name: 'Arcade', price: 9 },
  planAdv: { name: 'Advanced', price: 12 },
  planPro: { name: 'Pro', price: 15 },
  planSelected: { name: '', price: '' },
  onlineServices: { online: false, storage: false, profile: false },
  onlinePrices: { online: 0, storage: 0, profile: 0 },
  priceSelected: 0,
  phoneValid: false,
  mailValid: false,
}

export const globalStatesInfo = createSlice({
  name: 'global',
  initialState,
  reducers: {
    getName: (state, action) => {
      state.name = action.payload
    },
    getEmail: (state, action) => {
      state.email = action.payload
    },
    getPhone: (state, action) => {
      state.phoneNumber = action.payload
    },
    setPlanTime: (state, action) => {
      if (action.payload === true) {
        state.planAdv.price = state.planAdv.price * 10
        state.planArc.price = state.planArc.price * 10
        state.planPro.price = state.planPro.price * 10
        state.planSelected.price = state.planSelected.price * 10
      } else if (action.payload === false) {
        state.planAdv.price = state.planAdv.price / 10
        state.planArc.price = state.planArc.price / 10
        state.planPro.price = state.planPro.price / 10
        state.planSelected.price = state.planSelected.price / 10
      }
    },
    selectPlan: (state, action) => {
      state.planSelected.name = action.payload.name
      state.planSelected.price =
        action.payload.price +
        state.onlinePrices.online +
        state.onlinePrices.profile +
        state.onlinePrices.storage
    },
    setPlanTimeSwitch: (state, action) => {
      state.planTime = action.payload
    },
    addAddons: (state, action) => {
      if (action.payload.value === true) {
        if (action.payload.name === 'online') {
          state.onlinePrices.online = 5
          state.onlineServices.online = action.payload.value
          state.planSelected.price += state.onlinePrices.online
        }
        if (action.payload.name === 'storage') {
          state.onlinePrices.storage = 10
          state.onlineServices.storage = action.payload.value
          state.planSelected.price += state.onlinePrices.storage
        }
        if (action.payload.name === 'profile') {
          state.onlinePrices.profile = 15
          state.onlineServices.profile = action.payload.value
          state.planSelected.price += state.onlinePrices.profile
        }
      } else if (action.payload.value === false) {
        if (action.payload.name === 'online') {
          state.onlineServices.online = action.payload.value
          state.planSelected.price -= state.onlinePrices.online
          state.onlinePrices.online = 0
        }
        if (action.payload.name === 'storage') {
          state.onlineServices.storage = action.payload.value
          state.planSelected.price -= 10
        }
        if (action.payload.name === 'profile') {
          state.onlineServices.profile = action.payload.value
          state.planSelected.price -= 15
        }
      }
    },
    phoneValidation: (state, action) => {
      state.phoneValid = action.payload
    },
    mailValidation: (state, action) => {
      state.mailValid = action.payload
    },
  },
})

export default globalStatesInfo.reducer
export const {
  getName,
  getEmail,
  getPhone,
  setPlanName,
  setPlanTime,
  setPlanTimeSwitch,
  selectPlan,
  addAddons,
  phoneValidation,
  mailValidation,
} = globalStatesInfo.actions
