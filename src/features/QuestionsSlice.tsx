import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QuestionInterface } from "../helpers/interfaces";

type State = QuestionInterface[];

const initialState: State = [];

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<State>) {
      return (state = action.payload);
    },
  },
});

export const { setQuestions } = questionSlice.actions;
export default questionSlice.reducer;
