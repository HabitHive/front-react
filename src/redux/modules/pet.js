import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

//point 추가 필요
const initialState = {
  level: 1,
  exp: 0,
  levelUp: false
}

// 비동기 작업을 처리하는 action을 만든다
export const __getPetData = createAsyncThunk(
  "getPetData",
  async (payload, api) => {
    try {
      const res = await axios.get(`/pet`) // 백서버 연결할 때 사용
      return res.data.result
    } catch (err) {
      // console.log(err) 예외처리 할 때 확인
      api.rejectWithValue(err)
    }
  }
)

export const __setPetXP = createAsyncThunk(
  "setPetXP",
  async (payload, api) => {
    try {
      const res = await axios.post(`/pet`) 
      return res.data.result
    } catch (err) {
      api.rejectWithValue(err)
    }
  }
)

export const __getPoint = createAsyncThunk(
  "getPoint",
  async (payload, api) => {
    try {
      const res = await axios.post(`/user/random`) 
      return res.data.result.point
    } catch (err) {
      api.rejectWithValue(err)
    }
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
      state.level = action.payload.level
      state.exp = action.payload.exp
    })
    .addCase(__setPetXP.fulfilled, (state, action) => {
      // console.log(action.payload) 예외처리 할 때 확인
      state.level = action.payload.level
      state.exp = action.payload.exp
      state.levelUp = action.payload.levelUp
    })
    .addCase(__setPetXP.rejected, (state, action) => {
      // console.log(action.payload) 예외처리 할 때 확인
    })
  }
});

// actions
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const {} = petSlice.actions;

//reducer
export default petSlice.reducer;