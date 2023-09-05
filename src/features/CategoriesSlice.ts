import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CategoryInterface } from "../helpers/interfaces";

type State = CategoryInterface[];

const initialState: State = [];

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<State>) {
      state.length = 0;
      state.push(...action.payload);
    },
  },
});

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
