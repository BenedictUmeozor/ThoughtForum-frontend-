import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileInterface } from "../helpers/interfaces";

const initialState: UserProfileInterface = {
  _id: "",
  name: "",
  email: "",
  gender: "",
  bio: "",
  questions: [],
  following: [],
  followers: [],
  likedQuestions: [],
  likedAnswers: [],
  createdAt: "",
  updatedAt: "",
  __v: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProfileInterface>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
