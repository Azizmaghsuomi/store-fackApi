import React, { useEffect } from "react";
import { getCookie } from "../utils/helpers/cookie";
import useStore from "../store";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Authoraize = ({ children }) => {
  const { setState } = useStore();

  useEffect(() => {
    const readCookie = async () => {
      const result = await getCookie("credential");
      setState(result);
      console.log(result);
    };
    readCookie();
  }, []);
  return <>{children}</>;
};

const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Authoraize>
        {children}
        <ToastContainer />
      </Authoraize>
    </QueryClientProvider>
  );
};

export default Providers;
