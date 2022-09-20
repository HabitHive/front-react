import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

export const __getMyDaily = createAsyncThunk(
  "getMyDaily",
  async (payload, api) => {
    const now = new Date()
    const today = now.getDate()

    const startyear = now.getFullYear();
    const startmoth = [
    now.getMonth() + 1 > 9
      ? new Date().getMonth() + 1
      : "0" + (new Date().getMonth() + 1),
    ];
    const startDate = startyear + "-" + startmoth + "-" + today;

    const res = await axios.get(`/tag/daily?todayDate=${startDate}`)
    return res.data.result
  }
)

export const __doneMyDaily = createAsyncThunk(
  "doneMyDaily",
  async (payload, api )=> {
    const res = await axios.post(`/tag/done`,{scheduleId:payload,date:"2022-09-21"})
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

    })
    builder
    .addCase(__doneMyDaily.fulfilled,(state, action) => {
      console.log(action.payload)
      const idx = state.list.findIndex(data =>{
      return data.id = action.payload;
    });
    builder
    .addCase(__doneMyDaily.rejected,(state,action)=> {
console.log(action.payload)
    })

      state.list[idx].done= true;
    })
  }
});


export const {} = myDailySlice.actions;

export default myDailySlice.reducer;