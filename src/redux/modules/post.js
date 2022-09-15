import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

export const __getSchedule = createAsyncThunk(
  "getSchedule",
  async (payload, api) => {
    console.log(payload);
    const startyear = [payload[0].getFullYear()];
    const startmoth = [
    payload[0].getMonth() + 1 > 9
      ? new Date().getMonth() + 1
      : "0" + (new Date().getMonth() + 1),
    ];
    const startdate = [
    payload[0].getDate() > 9 ? new Date().getDate() : "0" + new Date().getDate(),
    ];
    const startday = [startyear + "-" + startmoth + "-" + startdate];

    const starttime = [payload[1].getHours() + ":" + payload[1].getMinutes()];
    const endtime = [payload[2].getHours() + ":" + payload[2].getMinutes()];
    const schedule = payload[3].join(",")
    console.log(...startday,...starttime,...endtime,schedule)

    const res = await axios.post(`/tag/schedule/add/:usertagId`,{...startday,...starttime,...endtime,schedule})
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
