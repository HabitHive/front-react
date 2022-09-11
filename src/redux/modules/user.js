import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLog: false,
  token: ""
}

export const __getNewToken = createAsyncThunk(
  "getNewToken",
  async (payload, thunkApi) => {
    try {
      return console.log(thunkApi)
    } catch (err) {
      return console.log(err)
    }
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
});

// actions
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const { setUser, deleteToken, setLogin } = userSlice.actions;

//reducer
export default userSlice.reducer;