import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../features/AuthSlice";
import CategoriesSlice from "../features/CategoriesSlice";
import QuestionsSlice from "../features/QuestionsSlice";
import SnackbarSlice from "../features/SnackbarSlice";
import UserSlice from "../features/UserSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    categories: CategoriesSlice,
    questions: QuestionsSlice,
    snackbar: SnackbarSlice,
    user: UserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
