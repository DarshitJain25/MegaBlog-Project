import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authslice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth_service";
import { useForm } from "react-hook-form";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    // console.log(data);
    try {
      const session = await authService.userLogin(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex w-full items-center justify-center px-5">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-5 flex justify-center">
            <Logo />
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-(--accent)">
            Welcome back
          </p>

          <h2 className="editorial-serif text-4xl font-semibold tracking-[-0.03em] text-(--ink)">
            Sign in to MegaBlog
          </h2>

          <p className="mt-3 text-sm text-(--muted)">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-(--accent) transition-colors hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="rounded-md border border-(--line)bg-(--surface) p-6 sm:p-8">
          {error && (
            <p className="mb-5 text-center text-sm text-red-600">{error}</p>
          )}

          <form onSubmit={handleSubmit(login)}>
            <div className="space-y-5">
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value,
                      ) || "Email address must be a valid address",
                  },
                })}
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                {...register("password", {
                  required: true,
                  maxLength: 20,
                  validate: (value) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value) ||
                    "Enter a valid Password",
                })}
              />

              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
