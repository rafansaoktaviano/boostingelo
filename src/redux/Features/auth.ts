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
  role: string | null;
}

const initialState: UserState = {
  isLogin: false,
  email: "",
  status: "",
  userData: null,
  role: null,
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
    setRole: (initialState, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "Booster Valorant":
        case "Booster Dota 2":
        case "Booster League of Legends":
        case "Booster Teamfight Tactics":
          initialState.role = "booster";
          break;
        case "Customer":
          initialState.role = "customer";
          break;
        case "Admin":
          initialState.role = "admin";
          break;
        case "Owner":
          initialState.role = "owner";
          break;
        default:
          initialState.role = "Not Login";
          break;
      }

      console.log(initialState.role);
    },
  },
});

export const { setRole, setUserData, setIsLogin, setEmail, setStatus } =
  userSlice.actions;
export default userSlice.reducer;
