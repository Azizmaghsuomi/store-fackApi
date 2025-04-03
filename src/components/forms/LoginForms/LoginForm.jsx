import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import loginApi from "../../../utils/apis/auth/LoginApi";
import { toast } from "react-toastify";
import useStore from "../../../store";
import { setCookie } from "../../../utils/helpers/cookie";
import { Link, useNavigate } from "react-router-dom";
const loginSchema = z.object({
  email: z.string().min(1, "it cannt be empty!").email("enter a valid email"),
  password: z.string().min(1, "it cannt be empty!"),
});

const LoginForm = () => {
  const { setState, access_token } = useStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (access_token != null && access_token != undefined) {
      navigate("/dashboard");
      toast.warn("already you have login!");
    }
  }, []);

  const handleLogin = async (data) => {
    try {
      const result = await loginApi(data);
      if (result?.status == 200 || result?.status == 201) {
        const access_token = result?.data?.access_token;
        const refresh_token = result?.data?.refresh_token;

        await setCookie("credential", {
          access_token: access_token,
          refresh_token: refresh_token,
        });
        setState({ access_token: access_token, refresh_token: refresh_token });
        toast.success("logged in successfully , redirecting to dashboard...");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else throw new Error("invalid username passord!");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => await handleLogin(data))}
      className="border-2 rounded-xl shadow-md p-4   w-[80%] lg:w-[30%]"
    >
      <fieldset className="flex flex-col gap-4" disabled={isSubmitting}>
        <input
          {...register("email")}
          className={`${
            errors?.email?.message ? "border-red-400" : "border-slate-400"
          } w-[100%] py-2 px-4 border-slate-400 focus:border-slate-500 rounded-md`}
          type="text"
          name="email"
          id="email"
          placeholder="enter email"
        />
        {errors?.email && (
          <p className="text-red-600">{errors.email.message}</p>
        )}
        <input
          {...register("password")}
          className={`${
            errors?.password?.message ? "border-red-400" : "border-slate-400"
          } w-[100%] py-2 px-4 border-slate-400 focus:border-slate-500 rounded-md`}
          type="password"
          name="password"
          id="password"
          placeholder="enter password"
        />
        {errors?.password && (
          <p className="text-red-600">{errors.password.message}</p>
        )}
        <button
          type="submit"
          className="bg-blue-400 text-slate-50 rounded-md py-2 px-4"
        >
          {isSubmitting ? "Logging..." : " Login"}
        </button>
        <Link to={"/Signup"} className=" my-3 text-center underline text-sm ">
          have not an account? <span className="text-blue-500">Sign up</span>
        </Link>
      </fieldset>
    </form>
  );
};

export default LoginForm;
