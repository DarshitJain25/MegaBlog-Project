import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth_service";
import { logout } from "../../store/authslice";
function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService
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
      className="
      ml-1
      px-3 py-2
      text-sm font-medium
      text-var(--muted)
      border border-var(--line)
      rounded-md
      transition-colors duration-200
      hover:border-(--accent)
      hover:text-(--accent)
    "
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
