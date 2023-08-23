import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: number;
  username: string;
  first: string;
  last: string;
  email: string;
  phone: string;
  role: string;
  is_loggedin: number;
  ban: number;
  reason: null;
  first_login: number;
}

interface UserState {
  user: IUser | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    signIn: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

// const userrr = {
//   id: 74,
//   username: "testadmin",
//   first: "Test",
//   last: "Admin",
//   email: "test@admin.com",
//   phone: "9874563210",
//   role: "Super",
//   is_loggedin: 1,
//   ban: 0,
//   reason: null,
//   first_login: 1,
// };
