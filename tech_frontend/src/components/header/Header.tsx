
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeMode, toggleTheme } from "../../redux/slices/themeSlice";
import { AppDispatchType } from "src/redux/store";

const Header = () => {
  // redux related
  const dispatch = useDispatch<AppDispatchType>();
  const currentTheme = useSelector(selectThemeMode);

  // useEffect
  useEffect(() => {
    document.documentElement.classList.toggle("dark", currentTheme === "dark");
    document.documentElement.classList.toggle(
      "light",
      currentTheme === "light"
    );
  }, [currentTheme]);

  const handleThemeChange = () => {
    console.log("Theme changed");
    dispatch(toggleTheme());
  };

  return (
    <header className="sticky top-0">
      <div className="flex h-full w-full justify-end">
        <button
          className="text-[var(--color-text)]"
          type="button"
          onClick={handleThemeChange}
        >
          Toggle theme
        </button>
      </div>
    </header>
  );
};

export default Header;
