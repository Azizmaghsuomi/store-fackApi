import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import createUserApi from "../../../utils/apis/users/createuserApi";
import { toast } from "react-toastify";
import useStore from "../../../store";
const loginSchema = z
  .object({
    name: z.string(4, "at least 4 chracter"),
    email: z.string().min(1, "it cannt be empty!").email("enter a valid email"),
    password: z.string().min(4, "at least 4 character"),
    avatar: z.string(),
    gender: z.string(),
  })
  .refine(
    (data) =>
      (data.avatar = `https://avatar.iran.liara.run/public/${data.gender}`)
  );

const SignupForm = () => {
  const navigate = useNavigate();
  const { access_token } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (access_token != null && access_token != undefined) {
      navigate("/dashboard");
      toast.warn("already you have login!!");
    }
  }, []);

  const handleSignUp = async (data) => {
    const result = await createUserApi(data);
    if (result?.status == 200 || result.status == 201) {
      toast.success("register successfully! , redirecting to login...");
      setTimeout(() => navigate("/Login"), 1000);
    } else {
      toast.error("something has wrong , try again later!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(async (data) => await handleSignUp(data))}
      className="border-2 rounded-xl shadow-md p-4   w-[80%] lg:w-[30%]"
    >
      <fieldset className="flex flex-col gap-4" disabled={isSubmitting}>
        <input type="hidden" name="avatar" {...register("avatar")} />
        <input
          {...register("name")}
          className={`${
            errors?.name?.message ? "border-red-400" : "border-slate-400"
          } w-[100%] py-2 px-4 border-slate-400 focus:border-slate-500 rounded-md`}
          type="text"
          name="name"
          id="name"
          placeholder="enter your name"
        />
        {errors?.name && <p className="text-red-600">{errors.name.message}</p>}
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
        <div className="flex flex-col ">
          <div className="flex gap-4">
            <input
              {...register("gender")}
              type="radio"
              value={"boy"}
              name="gender"
              id="male"
              defaultChecked
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className="flex gap-4">
            <input
              {...register("gender")}
              type="radio"
              value={"girl"}
              name="gender"
              id="female"
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-400 text-slate-50 rounded-md py-2 px-4"
        >
          {isSubmitting ? "Signuping..." : " Signup"}
        </button>
        <Link to={"/Login"} className=" my-3 text-center underline text-sm ">
          have a account? <span className="text-blue-500">Login</span>
        </Link>
      </fieldset>
    </form>
  );
};

export default SignupForm;
