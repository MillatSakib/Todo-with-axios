import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider";

const LoginNav = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className={user ? "flex items-center gap-2" : "hidden"}>
      <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user?.photoURL
                    ? user.photoURL
                    : "https://millatsakib.github.io/Project-Resource/%E2%80%94Pngtree%E2%80%94cartoon%20color%20simple%20male%20avatar_5230557.png"
                }
              />
            </div>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[99] menu p-2 shadow bg-base-100 rounded-box w-max"
        >
          <li className="px-4 py-2 text-base-content">
            {user?.displayName ? user.displayName : "No data found."}
          </li>
        </ul>
      </div>
      <button className="btn btn-error text-white" onClick={logOut}>
        Logout
      </button>
    </div>
  );
};

export default LoginNav;
