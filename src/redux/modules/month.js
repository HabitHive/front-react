import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

export const __getMonth = createAsyncThunk(
  "getMonth",
  async (payload, api) => {
    const res = await axios.get(`/tag/monthly/${payload}`)
    return res.data.result
  }
)

const initialState = {
    result: [null]
}

export const getMonthSlice = createSlice({
  name: 'month',
  initialState,
  reducers: { 
  },
  extraReducers: (builder) => {
    // builder
    // .addCase(__getMonth.fulfilled, (state, action) => {
    //   state.getDate = action.payload
    // })
    builder
    .addCase(__getMonth.fulfilled, (state, action) => {
      state.getDate = action.payload
    })
  }
});


export const {} = getMonthSlice.actions;

export default getMonthSlice.reducer;
