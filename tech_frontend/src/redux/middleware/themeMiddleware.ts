import { Middleware } from "@reduxjs/toolkit";
import STORAGE_KEYS from "src/constants/storageKeys";
import { ReduxStateType } from "../store";

const themeMiddleware: Middleware<{}, ReduxStateType> =
  (store) => (next) => (action) => {
    const result = next(action);

    // Type guard to check if this is an action object with a type property
    if (action && typeof action === "object" && "type" in action) {
      // Now TypeScript knows action has a type property
      if (action.type === "theme/toggleTheme") {
        const { mode } = store.getState().theme;

        // Update local storage
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEYS.theme, mode);
        }
      }
    }

    return result;
  };

export default themeMiddleware;
