import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

const initialState = {
  isLog: false,
  token: ""
}

export const __basicLogin = createAsyncThunk(
  "basicLogin",
  async (payload, api) => {
    const res = await axios.post(`/user/login`, payload) // 백서버 연결할 때 사용
    return res.data
  }
)

export const __kakaoLogin = createAsyncThunk(
  "kakaoLogin",
  (payload, api) => {
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

export const __logout = createAsyncThunk(
  "logout",
  async (payload, api) => {
    const res = await axios.get(`/user/logout`) // 백서버 연결할 때 사용
    console.log(res)
    return
  }
)

// userSlice라는 이름으로 유저 Slice 생성
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    // 나중에 지우기
    setUser: (state, action) => {
      state.isLog = true
      state.token = action.payload.token
      localStorage.setItem('token', action.payload.token)
    },
    //로그인 상태 유지
    setLogin: (state, action) => {
      state.isLog = true
      state.token = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(__basicLogin.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token)
      state.isLog = true
      state.token = action.payload.token
    })
    .addCase(__basicLogin.rejected, (state, action) => {
      state.isLog = false
    })

    .addCase(__kakaoLogin.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload)
      state.isLog = true
      state.token = action.payload
    })

    .addCase(__userCategory.fulfilled, (state, action) => {

    })
    .addCase(__userCategory.rejected, (state, action) => {

    })
  }
});

// actions
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const { setUser, setLogin } = userSlice.actions;

//reducer
export default userSlice.reducer;