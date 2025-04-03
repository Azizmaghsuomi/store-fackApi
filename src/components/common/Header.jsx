import React from "react";
import useStore from "../../store";
import { Link } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";

const Header = () => {
  const { access_token } = useStore();
  return (
    <header className="px-4 my-4">
      <div className="flex justify-between items-center bg-[#4D55CC] p-4 text-slate-800 font-semibold rounded-md">
        <Link
          className="capitalize flex gap-1 items-center text-blue-50"
          to={"/"}
        >
          <span>react recommerce</span>
          <StorefrontIcon />
        </Link>
        <button className="capitalize flex gap-2 items-center bg-blue-50 p-2 rounded-md shadow-[0_0_6px_blue-50]">
          {access_token != null && access_token != undefined ? (
            <Link to={"/Dashboard"}>
              <span>Dashboard</span>
              <AccountCircleIcon />
            </Link>
          ) : (
            <Link to={"/Login"}>
              <span>Login/Signup</span>
              <LoginIcon />
            </Link>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
