import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

export const __getMyDaily = createAsyncThunk(
  "getMyDaily",
  async (payload, api) => {
    const res = await axios.get(`/tag/daily?todayDate=2022-09-16`)
    return res.data.result
  }
)

const initialState = {
    result: [
    {
      userTagId: 0,
      tagName: "",
      scheduleId: 0,
      weekCycle: "",
      category: [],
      done: false
      },
    ]
}

export const myDailySlice = createSlice({
  name: 'daily',
  initialState,
  reducers: { 
  },
  extraReducers: (builder) => {
    builder
    .addCase(__getMyDaily.fulfilled, (state, action) => {
      state.myDaily = action.payload
    })
  }
});


export const {} = myDailySlice.actions;

export default myDailySlice.reducer;