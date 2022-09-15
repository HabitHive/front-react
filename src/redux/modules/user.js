import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

const initialState = {
  isLog: false,
  token: ""
}

export const __basicLogin = createAsyncThunk(
  "basicLogin",
  async (payload, api) => {
    await axios.post(`/user/login`, payload) // 백서버 연결할 때 사용
    .then(res=>{
      return res.data.token
    })
    .catch(err=>{
      console.log(err)
      return api.rejectWithValue(err)
    })
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
    await axios.put(`/user/interest`, payload)
    .then(res=>{
      return 
    })
    .catch(err=>{
      return api.rejectWithValue(err)
    })
  }
)

export const __logout = createAsyncThunk(
  "logout",
  async (payload, api) => {
    const res = await axios.delete(`/user/logout`, payload) // 백서버 연결할 때 사용
    console.log(res)
    return
  }
)

// userSlice라는 이름으로 유저 Slice 생성
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    setUser: (state, action) => {
      state.isLog = true
      state.token = action.payload.token
      localStorage.setItem('token', action.payload.token)
    },
    setLogin: (state, action) => {
      state.isLog = true
      state.token = action.payload
    },
    deleteToken: (state, action) => {
      state.isLog = false
      localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(__basicLogin.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload)
      state.isLog = true
      state.token = action.payload
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
export const { setUser, setLogin, deleteToken } = userSlice.actions;

//reducer
export default userSlice.reducer;