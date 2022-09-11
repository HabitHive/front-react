import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

const initialState = {
  randomTagList: [],
  tagList: []
}

// 비동기 작업을 처리하는 action을 만든다
export const __getTagBuyList = createAsyncThunk(
  "getTagBuyList",
  async (payload, api) => {
    const res = await axios.get(`/list`) //로컬테스트용
    return res.data[0]
  }
)

// userSlice라는 이름으로 유저 Slice 생성
export const tagBuySlice = createSlice({
  name: 'tagBuy',
  initialState,
  reducers: { 
  },
  extraReducers: (builder) => {
    builder
    .addCase(__getTagBuyList.fulfilled, (state, action) => {
      state.randomTagList = action.payload.result.randomTagList
      state.tagList = action.payload.result.tagList
    })
  }
});

// actions
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const { tagBuy } = tagBuySlice.actions;

//reducer
export default tagBuySlice.reducer;