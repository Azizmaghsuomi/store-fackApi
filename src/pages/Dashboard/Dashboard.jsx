import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../store";
import getUserInfoWithTokenApi from "../../utils/apis/users/getUserInfoWithTokenApi";
import { useQuery } from "@tanstack/react-query";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DashboardSkeleton from "../../components/skeleton/DashboardSkeleton";
import ErrorOnFetchApi from "../../components/common/ErrorOnFetchApi/ErrorOnFetchApi";
import { removeCookie } from "../../utils/helpers/cookie";
import { toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import Header from "../../components/common/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const { access_token, removeState } = useStore();
  const { isPending, error, data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfoWithTokenApi(),
    enabled: access_token != null && access_token != undefined,
  });
  console.log(data);
  const handleLogout = () => {
    removeCookie("credential");
    removeState();
    toast.warn("logged out successfully!");
    setTimeout(() => {
      navigate("/Login");
    }, 1000);
  };

  return (
    <div>
      <Header />
      {access_token != null && access_token != undefined ? (
        <>
          {isPending && <DashboardSkeleton />}
          {error && (
            <ErrorOnFetchApi
              message={"somthing has wrong , please try again later"}
            />
          )}
          {data && (
            <>
              <ListItem alignItems="flex-start">
                <div className="w-[10rem] pe-4">
                  <img
                    alt="profile image"
                    className="rounded-full"
                    src={data?.data?.avatar}
                  />
                </div>
                <ListItemText
                  primary={
                    <div className="font-bold">{`welcome , ${data?.data?.email}!`}</div>
                  }
                  secondary={
                    <div className="flex flex-col gap-4 mt-4">
                      <div>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          name :{" "}
                        </Typography>
                        {data?.data?.name}
                      </div>
                      <div>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          role :{" "}
                        </Typography>
                        {data?.data?.role}
                      </div>
                      <div>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          password :{" "}
                        </Typography>
                        {data?.data?.password}
                      </div>
                    </div>
                  }
                />
              </ListItem>
              <button
                className="bg-red-500 text-slate-50 rounded-md px-4 py-2 ms-4 flex gap-1 shadow-[0_0_4px_#842323]"
                onClick={handleLogout}
              >
                <LogoutIcon />
                Log out
              </button>
            </>
          )}
        </>
      ) : (
        <Link
          to={"/login"}
          className="underline flex items-center justify-center"
        >
          <p className="bg-[#7A73D1] px-4 py-2 capitalize text-slate-50 rounded-md my-16 text-xl">
            only logged in users can access to dashboard
          </p>
        </Link>
      )}
    </div>
  );
};

export default Dashboard;
