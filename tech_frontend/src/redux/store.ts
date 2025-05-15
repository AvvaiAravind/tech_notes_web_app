import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice";
import themeMiddleware from "./middleware/themeMiddleware";
import themeReducer from "./slices/themeSlice";

export const store: EnhancedStore = configureStore({
  reducer: {
    theme: themeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(themeMiddleware, apiSlice.middleware);
  },
  devTools: true,
});

export type ReduxStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
