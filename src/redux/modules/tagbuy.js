import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

//point 추가 필요
const initialState = {
  randomTagList: [],
  tagAllList: [],
  userPoint: 0
}

// 비동기 작업을 처리하는 action을 만든다
// 예외처리 추가하기
export const __getTagBuyList = createAsyncThunk(
  "getTagBuyList",
  async (payload, api) => {
    const data = await axios.post(`/tag/list`, {attention: ""})
    console.log()
    return data.data.result
  }
)

// 예외처리 추가하기
export const __addTag = createAsyncThunk(
  "addTag",
  async (payload, api) => {
  try {
    const res = await axios.post(`/tag/buy`, payload)
    return res.data
  } catch (err) {
    return api.rejectWithValue(err)
  }}
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
      state.randomTagList = action.payload.randomTagList
      state.tagAllList = action.payload.tagAllList
      state.userPoint = action.payload.userPoint
    })
    .addCase(__addTag.fulfilled, (state, action) => {

    })
    .addCase(__addTag.rejected, (state, action) => {

    })
  }
});

// actions
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const {} = tagBuySlice.actions;

//reducer
export default tagBuySlice.reducer;