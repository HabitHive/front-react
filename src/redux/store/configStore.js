import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../modules/user'
import tagBuySlice from '../modules/tagbuy'
import profileSlice from '../modules/mypage'
import myTagSlice from "../modules/mytag"
import getMonthSlice from "../modules/month"
import myScheduleSlice from "../modules/post"
import petSlice from '../modules/pet'

const store = configureStore({
  reducer: {
    user: userSlice,
    tagBuy: tagBuySlice,
    profile: profileSlice,
    myTag: myTagSlice,
    getMonth: getMonthSlice,
    Schedule:myScheduleSlice,
    pet: petSlice
  }
}) 

export default store