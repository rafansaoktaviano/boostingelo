import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface userState {
  isLogin: boolean;
  email?: string;
  status: string;
}

const initialState: userState = {
  isLogin: false,
  email: "",
  status: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLogin: (initialState, action: PayloadAction<boolean>) => {
      initialState.isLogin = action.payload;
    },
    setEmail: (initialState, action: PayloadAction<string>) => {
      initialState.email = action.payload;
    },
    setStatus: (initialState, action: PayloadAction<string>) => {
      initialState.status = action.payload;
    },
  },
});

export const { setIsLogin, setEmail, setStatus } = userSlice.actions;
export default userSlice.reducer