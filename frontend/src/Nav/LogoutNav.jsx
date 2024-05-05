import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const LogoutNav = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <div>
      <NavLink
        to="/login"
        className={
          user ? "hidden" : loading ? "hidden" : "btn btn-success text-white"
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={
          user ? "hidden" : loading ? "hidden" : "btn btn-info mx-2 text-white"
        }
      >
        Register
      </NavLink>
    </div>
  );
};

export default LogoutNav;
