import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLog: false,
}

// userSlice라는 이름으로 유저 Slice 생성
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    setUser: (state, action) => {
      state.isLog = true
      localStorage.setItem('token', action.payload.accessToken)
    },
    setLogin: (state, action) => {
      state.isLog = true
    },
    deleteToken: (state, action) => {
      state.isLog = false
      localStorage.removeItem("token")
    },
  },
});

// actions
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const { setUser, deleteToken, setLogin } = userSlice.actions;

//reducer
export default userSlice.reducer;