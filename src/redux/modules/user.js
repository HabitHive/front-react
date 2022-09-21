import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";
import { setCookie, removeCookie } from "../../util/cookies";

const initialState = {
  isLog: false,
  session: ""
}

export const __signup = createAsyncThunk(
  "signup",
  async (payload, api) => {
    try {
      const res = await axios.post(`/user/signup`, payload) // 백서버 연결할 때 사용
      setCookie("session", res.data.session)
      return res.data.session
    } catch (err) {
      api.rejectWithValue(err)
    }
  }
)

export const __basicLogin = createAsyncThunk(
  "basicLogin",
  async (payload, api) => {
    try {
      const res = await axios.post(`/user/login`, payload) // 백서버 연결할 때 사용
      return res.data.session
    } catch (err) {
      // console.log(err) 예외처리 할 때 확인
      console.log(err)
      api.rejectWithValue(err)
    }
  }
)

export const __kakaoLogin = createAsyncThunk(
  "kakaoLogin",
  (payload, api) => {
    console.log(payload)
    setCookie("session", payload)
    return payload
  }
)

export const __userCategory = createAsyncThunk(
  "userCategory",
  async (payload, api) => {
    const res = await axios.put(`/user/interest`, payload)
    return res
  }
)

// 다시 확인하기
export const __logout = createAsyncThunk(
  "logout",
  async (payload, api) => {
    const res = await axios.delete(`/user/logout`) // 백서버 연결할 때 사용
    console.log(res)
    return
  }
)

// userSlice라는 이름으로 유저 Slice 생성
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    //로그인 상태 유지
    setLogin: (state, action) => {
      state.isLog = true
      state.session = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
    // 회원가입
    .addCase(__signup.fulfilled, (state, action) => {
      state.isLog = true
      state.session = action.payload
    })
    .addCase(__signup.rejected, (state, action) => {
      console.log(action.payload)
      state.isLog = false
    })
    // 일반 로그인
    .addCase(__basicLogin.pending, (state, action) => {
      state.isLog = false
    })
    .addCase(__basicLogin.fulfilled, (state, action) => {
      setCookie("session", action.payload)
      state.isLog = true
      state.session = action.payload
    })
    .addCase(__basicLogin.rejected, (state, action) => {
      console.log(action.payload)
      state.isLog = false
    })
    // 카카오 소셜 로그인
    .addCase(__kakaoLogin.fulfilled, (state, action) => {
      state.isLog = true
      state.session = action.payload
    })
    // 가입 시 유저 관심사 선택
    .addCase(__userCategory.fulfilled, (state, action) => {

    })
    .addCase(__userCategory.rejected, (state, action) => {
      console.log(action.payload)

    })
    .addCase(__logout.fulfilled, (state, action) => {

    })
  }
});

// actions
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const { setLogin } = userSlice.actions;

//reducer
export default userSlice.reducer;