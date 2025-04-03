import React from "react";

const ErrorOnFetchApi = ({ message = null }) => {
  return (
    <p className="bg-red-600 text-slate-50 text-center rounded-lg shadow-sm p-4 capitalize">
      {message ? message : "somthing has wrong , please try again later"}
    </p>
  );
};

export default ErrorOnFetchApi;
