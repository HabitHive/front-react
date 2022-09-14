import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

export const __getDate = createAsyncThunk(
  "getDate",
  async (payload, api) => {
    // console.log(payload)

    const res = await axios.get(`/tag/monthly/${payload}`)
    console.log(res)
    return res
  
  }
)

const initialState = {
    result: [null]
}

export const getDateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: { 
  },
  extraReducers: (builder) => {
    // builder
    // .addCase(__getProfile.fulfilled, (state, action) => {
    //   state.email = action.payload.email
    //   state.nickname = action.payload.nickname
    //   state.point = action.payload.point
    // })
    builder
    .addCase(__getDate.fulfilled, (state, action) => {
      state.getDate = action.payload
    })
  }
});


export const {} = getDateSlice.actions;

export default getDateSlice.reducer;
