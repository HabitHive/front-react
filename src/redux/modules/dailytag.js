import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useState } from "react";

import axios from "../../axios/axios";

export const __getMyDaily = createAsyncThunk(
  "getMyDaily",
  async (payload) => {
    const now = new Date()

    if (payload === undefined) {
    payload = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
    }
    const res = await axios.get(`/tag/daily?todayDate=${payload}`)
    return res.data.result
    }
)

export const __doneMyDaily = createAsyncThunk(
  "doneMyDaily",
  async (payload, api )=> {
    const res = await axios.post(`/tag/done`,{scheduleId:payload,date:"2022-09-22"})
    return payload
  }
)

const initialState = {
    myDaily: [
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
      // const idx = state.list.findIndex(data => {
      //   console.log(data)
      //   return data.id = action.payload;
      // })
      // state.list[idx].done = true;
    })
        // .addCase(__getMyDaily.pending, (state, action) => {
    //   state.myDaily = action.payload
    // })
    .addCase(__doneMyDaily.rejected,(state,action)=> {
      console.log(action.payload)
      })
  }
});


export const {} = myDailySlice.actions;

export default myDailySlice.reducer;