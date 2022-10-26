import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    userAdded(state, action) {
      state.push({
        user: action.payload.user,
        completed: true,
      });
    },
  },
});

export const { userAdded } = userSlice.actions;
export default userSlice.reducer;
