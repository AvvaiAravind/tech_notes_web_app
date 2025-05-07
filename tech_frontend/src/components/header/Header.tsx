import { useEffect } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "src/hooks/reduxHooks";
import { selectThemeMode, toggleTheme } from "../../redux/slices/themeSlice";
import { Button } from "../ui/button";

const Header = () => {
  // redux related
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectThemeMode);

  // useEffect
  useEffect(() => {
    document.documentElement.classList.toggle("dark", currentTheme === "dark");
  }, [currentTheme]);

  // event handlers
  const handleThemeChange = () => {
    console.log("Theme changed");
    dispatch(toggleTheme());
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-background p-2 shadow-custom">
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
