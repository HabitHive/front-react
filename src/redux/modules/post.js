import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

export const __getSchedule = createAsyncThunk(
  "getSchedule",
  async (payload, api) => {
    const res = await axios.post(`/tag/schedule/add/:usertagId`,{payload})
    return res.data.result
  }
)

const initialState = {
    result: [
    {
      startTime:"",
      endTime:"",
      weekCycle: [],
    startDate : ""
    },
    ]
}

export const myScheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: { 
  },
  extraReducers: (builder) => {
    // builder
    // .addCase(__getSchedule.fulfilled, (state, action) => {
    //   state.startTime = action.payload.startTime
    //   state.endTime = action.payload.endTime
    //   state.weekCycle = action.payload.weekCycle
    // state.startDate = action.payload.startDate
    // })
    builder
    .addCase(__getSchedule.fulfilled, (state, action) => {
      state.schedule = action.payload
    })
  }
});


export const {} = myScheduleSlice.actions;

export default myScheduleSlice.reducer;
