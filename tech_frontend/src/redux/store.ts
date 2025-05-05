import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export type ReduxStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
