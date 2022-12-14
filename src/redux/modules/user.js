import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";
import setToken from "../../axios/setToken"

const initialState = {
  isLog: false
}

export const __signup = createAsyncThunk(
  "signup",
  async (payload, api) => {
    try {
      const res = await axios.post(`/user/signup`, payload)
      return res.data.accessToken
    } catch (err) {
      return api.rejectWithValue(err.response.status)
    }
  }
)

export const __basicLogin = createAsyncThunk(
  "basicLogin",
  async (payload, api) => {
    try {
      const res = await axios.post(`/user/login`, payload) 
      return res.data.accessToken
    } catch (err) {
      return api.rejectWithValue(err.response.status)
    }
  }
)

export const __kakaoLogin = createAsyncThunk(
  "kakaoLogin",
  async (payload, api) => {
    try {
      return payload
    } catch (err) {
      return api.rejectWithValue(err)
    }
  }
)

export const __userCategory = createAsyncThunk(
  "userCategory",
  async (payload, api) => {
    try {
      const res = await axios.put(`/user/interest`, payload)
      return res.data
    } catch (err) {
      return api.rejectWithValue(err)
    }
  }
)

// userSlice라는 이름으로 유저 Slice 생성
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    //로그인 상태 유지
    setLogin: (state, action) => {
      state.isLog = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
    // 회원가입
    .addCase(__signup.fulfilled, (state, action) => {
      localStorage.setItem("accessToken", action.payload)
      setToken(action.payload)
      state.isLog = true
    })
    .addCase(__signup.rejected, (state, action) => {
      state.isLog = false
    })

    // 일반 로그인
    .addCase(__basicLogin.fulfilled, (state, action) => {
      localStorage.setItem("accessToken", action.payload)
      setToken(action.payload)
      state.isLog = true
    })
    .addCase(__basicLogin.rejected, (state, action) => {
      state.isLog = false
    })

    // 카카오 소셜 로그인
    .addCase(__kakaoLogin.fulfilled, (state, action) => {
      localStorage.setItem("accessToken", action.payload)
      setToken(action.payload)
      state.isLog = true
    })
    .addCase(__kakaoLogin.rejected, (state, action) => {
      state.isLog = false
    })

    // 가입 시 유저 관심사 선택
    .addCase(__userCategory.fulfilled, (state, action) => {
    })
    .addCase(__userCategory.rejected, (state, action) => {
      console.log(action.payload) //에러일 때 콘솔
    })
  }
});

// actions
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const { setLogin } = userSlice.actions;

//reducer
export default userSlice.reducer;