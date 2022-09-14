import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../modules/user'
import tagBuySlice from '../modules/tagbuy'
import profileSlice from '../modules/mypage'
import myTagSlice from "../modules/mytag"
import getDateSlice from "../modules/date"

const store = configureStore({
  reducer: {
    user: userSlice,
    tagBuy: tagBuySlice,
    profile: profileSlice,
    myTag: myTagSlice,
    getDate: getDateSlice,
  }
}) 

export default store