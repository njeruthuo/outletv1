import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const MainLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Outlet />
        </>
      ) : (
        <>
          <Navigate to={"/sign-in"} />
        </>
      )}
    </div>
  );
};
export default MainLayout;
