import { Outlet } from "react-router";
import Header from "src/components/header/Header";

const Layout = () => {
  return (
    <div className="scrollbar-thin flex flex-grow flex-col items-center bg-background">
      <Header />
      <div className="h-[200vh] p-4 text-center text-5xl text-primary">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
