import React, { useState } from "react";
import authService from "../appwrite/auth_service";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authslice";
import { Logo, Input, Button } from "../components/index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
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
            Join MegaBlog
          </p>

          <h2 className="editorial-serif text-4xl font-semibold tracking-[-0.03em] text-(--ink)">
            Create your account
          </h2>

          <p className="mt-3 text-sm text-(--muted)">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-(--accent) transition-colors hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="rounded-md border border-(--line) bg-(--surface) p-6 sm:p-8">
          {error && (
            <p className="mb-5 text-center text-sm text-red-600">{error}</p>
          )}

          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                {...register("name", {
                  required: true,
                })}
              />

              <Input
                label="Email"
                type="email"
                placeholder="Enter you Email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value,
                      ) || "Enter a valid Email Address",
                  },
                })}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                  maxLength: 20,
                  validate: {
                    matchPattern: (value) =>
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value) ||
                      "Enter a valid Password",
                  },
                })}
              />

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
