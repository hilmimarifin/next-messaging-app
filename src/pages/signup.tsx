import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import GoogleButton from "../components/ButtonGoogle";
import { signin, signup } from "../helpers/authUser";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

type formData = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

const signInSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required").min(8),
  confirmPassword: z.string()
}).required().refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});

export default function Signin() {
  const router = useRouter()
  const { register, setValue, handleSubmit, clearErrors, setError, getValues, formState: { errors, defaultValues, touchedFields } } = useForm<formData>({ defaultValues: { email: '', password: '', confirmPassword: '' }, resolver: zodResolver(signInSchema) })
  const onSubmit: SubmitHandler<formData> = (data) => signup(data)
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-5 py-7">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Name</label>
              <input {...register("name")} type="text" className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" />
              {errors.name && <p className=" text-red-500 text-xs">{errors.name.message}</p>}
              <label className="font-semibold text-sm text-gray-600 pb-1 block mt-5">E-mail</label>
              <input {...register("email")} type="text" className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" />
              {errors.email && <p className=" text-red-500 text-xs">{errors.email.message}</p>}
              <label className="font-semibold text-sm text-gray-600 pb-1 block mt-5">Password</label>
              <input {...register("password")} type="password" className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" />
              {errors.password && <p className=" text-red-500 text-xs">{errors.password.message}</p>}
              <label className="font-semibold text-sm text-gray-600 pb-1 block mt-5">Confirm Password</label>
              <input {...register("confirmPassword")} type="password" className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" />
              {errors.confirmPassword && <p className=" text-red-500 text-xs">{errors.confirmPassword.message}</p>}
              <button type="submit" className=" mt-5 transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                <span className="inline-block mr-2">Create Account</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <div className=" mt-3 mb-3">
                <GoogleButton type="signup" />
              </div>
              <button onClick={() => router.push("signin")} className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <span className="inline-block ml-1">Already have an account? Sign in</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}