import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";
import setToken from "../../axios/setToken";

const initialState = {
  isLog: false,
  token: ""
}

export const __signup = createAsyncThunk(
  "signup",
  async (payload, api) => {
    try {
      const res = await axios.post(`/user/signup`, payload) // 백서버 연결할 때 사용
      setToken(res.data.token)
      return res.data
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
      console.log(res)
      setToken(res.data.token)
      return res.data
    } catch (err) {
      // console.log(err) 예외처리 할 때 확인
      api.rejectWithValue(err)
    }
  }
)

export const __kakaoLogin = createAsyncThunk(
  "kakaoLogin",
  (payload, api) => {
    return payload
  }
)

export const __getNewToken = createAsyncThunk(
  "getNewToken",
  async (payload, api) => {
    const res = await axios.get(`/token`) // 백서버 연결할 때 사용
    return res.data
  }
)

export const __userCategory = createAsyncThunk(
  "userCategory",
  async (payload, api) => {
    const res = await axios.put(`/user/interest`, payload)
    return res
  }
)

export const __logout = createAsyncThunk(
  "logout",
  async (payload, api) => {
    const res = await axios.get(`/user/logout`) // 백서버 연결할 때 사용
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
      state.token = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
    // 회원가입
    .addCase(__signup.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token)
      state.isLog = true
      state.token = action.payload.token
    })
    .addCase(__signup.rejected, (state, action) => {
      // console.log(action.payload) 예외처리 할 때 확인
      state.isLog = false
    })
    // 일반 로그인
    .addCase(__basicLogin.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token)
      state.isLog = true
      state.token = action.payload.token
    })
    .addCase(__basicLogin.rejected, (state, action) => {
      state.isLog = false
    })
    // 카카오 소셜 로그인
    .addCase(__kakaoLogin.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload)
      state.isLog = true
      state.token = action.payload
    })
    // 가입 시 유저 관심사 선택
    .addCase(__userCategory.fulfilled, (state, action) => {

    })
    .addCase(__userCategory.rejected, (state, action) => {

    })
    // 토큰 만료 전 재발급
    .addCase(__getNewToken.pending, (state, action) => {
      localStorage.removeItem('token')
    })
    .addCase(__getNewToken.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token)
      state.isLog = true
      state.token = action.payload.token
    })
  }
});

// actions
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const { setLogin } = userSlice.actions;

//reducer
export default userSlice.reducer;