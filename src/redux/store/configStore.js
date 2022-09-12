import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../modules/user'
import tagBuySlice from '../modules/tagbuy'

const store = configureStore({
  reducer: {
    user: userSlice,
    tagBuy: tagBuySlice
  }
}) 

export default store