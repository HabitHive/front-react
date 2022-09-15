import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

export const __getMyTags = createAsyncThunk(
  "getMyTags",
  async (payload, api) => {
    const res = await axios.get(`/tag/daily/list`)
    return res.data.result
  }
)

const initialState = {
    result: [
    {
      userTagId: 0,
      new: true,
      tagName: "",
      period: 0
    },
    ]
}

export const myTagSlice = createSlice({
  name: 'tag',
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
    .addCase(__getMyTags.fulfilled, (state, action) => {
      state.myTags = action.payload
    })
  }
});


export const {} = myTagSlice.actions;

export default myTagSlice.reducer;
