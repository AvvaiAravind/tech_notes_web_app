import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import themeMiddleware from "./middleware/themeMiddleware";
import themeReducer from "./slices/themeSlice";

export const store: EnhancedStore = configureStore({
  reducer: {
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(themeMiddleware);
  },
});

export type ReduxStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
