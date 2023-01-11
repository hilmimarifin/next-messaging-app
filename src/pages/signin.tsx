import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import GoogleButton from "../components/ButtonGoogle";
import { signin } from "../helpers/authUser";
import Button from "../components/Button";
import { useMutation } from "react-query";
import Alert from "../components/Alert";

type formData = {
  email: string,
  password: string,
}

export default function Signin() {
  const router = useRouter()
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<formData>()
  const { isLoading, mutate, isError } = useMutation(signin)

  const onSubmit: SubmitHandler<formData> = (data) => mutate(data)
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      {
        isError && <Alert type="error" message="Email or Password is not found" />
      }
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-5 py-7">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
              <input {...register("email", { required: true })} type="text" className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" />
              {errors.email && <p className=" text-red-500 text-xs">Email is required</p>}
              <label className="font-semibold text-sm text-gray-600 pb-1 block mt-5">Password</label>
              <input {...register("password", { required: true })} type="password" className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" />
              {errors.password && <p className=" text-red-500 text-xs">Password is required</p>}
              <div className="mt-5">
                <Button text="sign in" type="submit" loading={isLoading} />
              </div>
              <div className=" mt-3 mb-3">
                <GoogleButton type="signin" />
              </div>
              <button onClick={() => router.push("signup")} className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <span className="inline-block ml-1">Do not have an account? Sign up</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}