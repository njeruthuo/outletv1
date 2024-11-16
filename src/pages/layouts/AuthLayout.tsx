// import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <Outlet />
        </div>
        <div className="w-1/2 h-screen">
          <img src="./one.png" className="w-full h-full object-cover" alt="" />
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
