import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth_service";
import { logout } from "../../store/authslice";
import authservice from "../../appwrite/auth_service";
function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authservice
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) =>
        console.log("Components :: Header :: LogoutBtn :: error", error),
      );
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
