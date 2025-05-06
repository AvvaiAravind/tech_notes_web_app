import { createSlice } from "@reduxjs/toolkit";
import { ReduxStateType } from "../store";
import STORAGE_KEYS from "src/constants/storageKeys";

export type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
}

// get the initial theme based on:
// 1. system preference (dark mode or light mode)
// 2. local storage (if user has a preference set)

export const getInitialTheme = (): ThemeMode => {
  if (typeof window !== "undefined") {
    const userPreference = localStorage.getItem(
      STORAGE_KEYS.theme
    ) as ThemeMode | null;
    if (userPreference && ["light", "dark"].includes(userPreference)) {
      return userPreference;
    }
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    return systemPreference;
  }
  return "light";
};

// initial state

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const selectThemeMode = (state: ReduxStateType): ThemeMode =>
  state.theme.mode;
const themeReducer = themeSlice.reducer;
export default themeReducer;
