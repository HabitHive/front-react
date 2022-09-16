import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

//point 추가 필요
const initialState = {
  exp: 0,
  level: 1
}

// 비동기 작업을 처리하는 action을 만든다
export const __getPetData = createAsyncThunk(
  "getPetData",
  async (payload, api) => {
    const res = await axios.get(`/pet`) //백서버 연결
    console.log(res)
    return res.data.result
  }
)

// userSlice라는 이름으로 유저 Slice 생성
export const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: { 
  },
  extraReducers: (builder) => {
    builder
    .addCase(__getPetData.fulfilled, (state, action) => {

    })
  }
});

// actions
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const {} = petSlice.actions;

//reducer
export default petSlice.reducer;