import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface UserData {
  id: string;
  fullname: string;
  email?: string;
  avatar_url: string;
}

interface UserState {
  isLogin: boolean;
  email?: string;
  status: string;
  userData: UserData | null;
}

const initialState: UserState = {
  isLogin: false,
  email: "",
  status: "",
  userData: null,
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
    setUserData: (initialState, action: PayloadAction<UserData | null>) => {
      initialState.userData = action.payload;
    },
  },
});

export const { setUserData, setIsLogin, setEmail, setStatus } =
  userSlice.actions;
export default userSlice.reducer;
