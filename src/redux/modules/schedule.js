import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

export const __getSchedule = createAsyncThunk(
  "getSchedule",
  async (payload, api) => {
    const startyear = [payload[0].getFullYear()];
    const startmoth = [
    payload[0].getMonth() + 1 > 9
      ? new Date().getMonth() + 1
      : "0" + (new Date().getMonth() + 1),
    ];
    const startdate = [
    payload[0].getDate() > 9 ? new Date().getDate() : "0" + new Date().getDate(),
    ];
    const startDate = startyear + "-" + startmoth + "-" + startdate;

    const startTime = payload[1].getHours() + ":" + payload[1].getMinutes();
    const endTime = payload[2].getHours() + ":" + payload[2].getMinutes();
    const weekCycle = payload[3].join(",")
    const userTagId = payload[4].userTagId
    
    const res = await axios.post(`/tag/schedule/add/${userTagId}`,{startDate,startTime,endTime,weekCycle})
    return res.data.result
  }
)

export const __deleteSchedule = createAsyncThunk(
  "deleSchedule",
  async (payload) => {
    const res = await axios.delete(`/tag/schedule/delete/${payload}`)
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
    builder
    .addCase(__getSchedule.fulfilled, (state, action) => {
      state.schedule = action.payload
    })
  }
});


export const {} = myScheduleSlice.actions;

export default myScheduleSlice.reducer;
