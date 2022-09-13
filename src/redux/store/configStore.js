import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../modules/user'
import tagBuySlice from '../modules/tagbuy'
import profileSlice from '../modules/mypage'

const store = configureStore({
  reducer: {
    user: userSlice,
    tagBuy: tagBuySlice,
    profile: profileSlice
  }
}) 

export default store