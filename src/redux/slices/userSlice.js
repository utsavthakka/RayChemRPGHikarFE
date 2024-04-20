import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  token: "",
  userPermission : [],
  is_superuser:false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails(state, { payload }) {
      return { ...state, ...payload };
    },
    clearUserDetails(state) {
      return initialState;
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;
