import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../modules/user'
import tagBuySlice from '../modules/tagbuy'
import profileSlice from '../modules/mypage'
import myTagSlice from "../modules/mytag"
import getMonthSlice from "../modules/month"
import myScheduleSlice from "../modules/post"
import petSlice from '../modules/pet'
import  myDailySlice from '../modules/dailytag'


const store = configureStore({
  reducer: {
    user: userSlice,
    tagBuy: tagBuySlice,
    profile: profileSlice,
    myTag: myTagSlice,
    getMonth: getMonthSlice,
    Schedule:myScheduleSlice,
    pet: petSlice,
    getMyDaily: myDailySlice,
  }
}) 

export default store