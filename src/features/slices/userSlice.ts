import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: { id: number; name: string } | null;
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
    setUser: (
      state,
      action: PayloadAction<{ id: number; name: string } | null>
    ) => {
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
