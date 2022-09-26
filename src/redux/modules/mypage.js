import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

export const __getProfile = createAsyncThunk(
  "getProfile",
  async (payload, api) => {
    const res = await axios.get(`/user/mypage/info`) // 백서버 연결할 때 사용
    return res.data.result
  }
)

export const __getUserTags = createAsyncThunk(
  "getUserTags",
  async (payload, api) => {
    const res = await axios.put(`/user/mypage/tag`) // 백서버 연결할 때 사용
    return res.data.result
  }
)

const initialState = {
  email: "",
  nickname: "",
  point: 0,
  petLevel: 1,
  userTags: {
    stillTags:[],
    successTags:[],
    failTags:[]
  }
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: { 
  },
  extraReducers: (builder) => {
    builder
    .addCase(__getProfile.fulfilled, (state, action) => {
      state.email = action.payload.email
      state.nickname = action.payload.nickname
      state.point = action.payload.point
      state.petLevel = action.payload.petLevel
    })
    builder
    .addCase(__getUserTags.fulfilled, (state, action) => {
      state.userTags = action.payload
    })
  }
});

// actions
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const {} = profileSlice.actions;

//reducer
export default profileSlice.reducer;