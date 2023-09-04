import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Category {
  _id: string;
  title: string;
  question: string[];
}

type State = Category[];

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
