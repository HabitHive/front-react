import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLog: false,
  token: ""
}

export const __basicLogin = createAsyncThunk(
  "basicLogin",
  (payload, api) => {
    return payload
  }
)

export const __kakaoLogin = createAsyncThunk(
  "kakaoLogin",
  (payload, api) => {
    return payload
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
    setLogin: (state) => {
      state.isLog = true
    },
    deleteToken: (state, action) => {
      state.isLog = false
      localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(__kakaoLogin.fulfilled, (state, action) => {
      state.isLog = true
      state.token = action.payload
      localStorage.setItem('token', action.payload)
    })
  }
});

// actions
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const { setUser, setLogin, deleteToken } = userSlice.actions;

//reducer
export default userSlice.reducer;