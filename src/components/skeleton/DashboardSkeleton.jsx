import { ListItem, ListItemText } from "@mui/material";
import React from "react";

const DashboardSkeleton = () => {
  return (
    <ListItem alignItems="flex-start">
      <div
        alt="profile image"
        className="rounded-full animate-pulse bg-slate-400 w-[5rem] lg:w-[10rem] h-[5rem] lg:h-[10rem] me-6"
      />

      <ListItemText
        primary={
          <div className="bg-slate-400 animate-pulse  rounded-lg w-[15rem] h-[1.5rem]"></div>
        }
        secondary={
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex gap-4">
              <div className="bg-slate-400 animate-pulse  rounded-lg w-[8rem] h-[1rem]"></div>
              <div className="bg-slate-400 animate-pulse  rounded-lg w-[5rem] h-[1rem]"></div>
            </div>
            <div className="flex gap-4">
              <div className="bg-slate-400 animate-pulse  rounded-lg w-[8rem] h-[1rem]"></div>
              <div className="bg-slate-400 animate-pulse  rounded-lg w-[5rem] h-[1rem]"></div>
            </div>
            <div className="flex gap-4">
              <div className="bg-slate-400 animate-pulse  rounded-lg w-[8rem] h-[1rem]"></div>
              <div className="bg-slate-400 animate-pulse  rounded-lg w-[5rem] h-[1rem]"></div>
            </div>
          </div>
        }
      />
    </ListItem>
  );
};

export default DashboardSkeleton;
