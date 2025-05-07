import { Outlet } from "react-router-dom";

const DashLayout = () => {
  return (
    <>
      <div className="">
        <Outlet />
      </div>
    </>
  );
};

export default DashLayout;
