import { createSlice } from "@reduxjs/toolkit";

// userSlice라는 이름으로 유저 Slice 생성
export const userSlice = createSlice({
  name: 'user',
  initialState: {email:"", nickname:""},
  reducers: { 
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
    }
  },
});

// actions
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const { setUser } = userSlice.actions;

//reducer
export default userSlice.reducer;