import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


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
    return [res.data.result,payload]
    }
  )

export const __doneMyDaily = createAsyncThunk(
  "doneMyDaily",
  async (payload)=> {
    const res = await axios.post(`/tag/done`,{scheduleId:payload.id,date:payload.date})
    return [res.data.result,payload]
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
    .addCase(__getMyDaily.rejected, (state, action) => {
      console.log(action.payload)
    })
    .addCase(__doneMyDaily.fulfilled,(state,action) => {
      const idx = state.myDaily[0].findIndex(data => {
        return data.scheduleId === action.payload[1].id;
        });
      state.myDaily[0][idx].done = true
    })
    .addCase(__doneMyDaily.rejected,(state,action)=> {
      // console.log(state.myDaily,action)
      })
  }
});


export const {} = myDailySlice.actions;

export default myDailySlice.reducer;