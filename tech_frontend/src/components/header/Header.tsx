import { useEffect } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType } from "src/redux/store";
import { selectThemeMode, toggleTheme } from "../../redux/slices/themeSlice";
import { Button } from "../ui/button";

const Header = () => {
  // redux related
  const dispatch = useDispatch<AppDispatchType>();
  const currentTheme = useSelector(selectThemeMode);

  // useEffect
  useEffect(() => {
    document.documentElement.classList.toggle("dark", currentTheme === "dark");
  }, [currentTheme]);

  const handleThemeChange = () => {
    console.log("Theme changed");
    dispatch(toggleTheme());
  };

  return (
    <header className="sticky top-0">
      <div className="flex h-full w-full justify-end">
        <Button
          className="cursor-pointer rounded-full"
          type="button"
          variant="outline"
          onClick={handleThemeChange}
        >
          {currentTheme === "dark" ? (
            <MdOutlineLightMode />
          ) : (
            <MdOutlineDarkMode />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
