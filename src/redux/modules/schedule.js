import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

export const __addSchedule = createAsyncThunk(
  "addSchedule",
  async (payload, api) => {
    const startDate = new Date(payload[0].getTime() - payload[0].getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
    const startTime = payload[1].getHours() + ":" + payload[1].getMinutes();
    const endTime = payload[2].getHours() + ":" + payload[2].getMinutes();
    const weekCycle = payload[3].join(",")
    const userTagId = payload[4].userTagId
    
    const res = await axios.post(`/tag/schedule/add/${userTagId}`,{startDate,startTime,endTime,weekCycle})
    return res.data.result
  }
)

export const __updateSchedule = createAsyncThunk(
  "updateSchedule",
  async (payload) => {
    const startDate = new Date(payload[0].getTime() - payload[0].getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
    const startTime = payload[1].getHours() + ":" + payload[1].getMinutes();
    const endTime = payload[2].getHours() + ":" + payload[2].getMinutes();
    const weekCycle = payload[3].join(",")
    const scheduleId = payload[4].scheduleId

    const res = await axios.patch(`/tag/schedule/update/${scheduleId}`,{startDate,startTime,endTime,weekCycle})
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
    .addCase(__addSchedule.fulfilled, (state, action) => {
      state.schedule = action.payload
    })
  }
});


export const {} = myScheduleSlice.actions;

export default myScheduleSlice.reducer;
