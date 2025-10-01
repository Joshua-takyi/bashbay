"use client";

import { useAuth } from "@/hooks/useAuth";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  Input,
  addToast,
} from "@heroui/react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState<null | boolean>(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const router = useRouter();

  const { useLogin } = useAuth();
  const { mutate, isPending } = useLogin();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email.trim() === "") {
      addToast({
        color: "warning",
        title: "Email is required",
      });
      return;
    }
    if (form.password.trim() === "") {
      addToast({
        color: "warning",
        title: "Password is required",
      });
      return;
    }
    setErrors({});
    setSubmitted(null);
    mutate(
      { email: form.email, password: form.password },
      {
        onSuccess: () => {
          setSubmitted(true);
          addToast({
            color: "success",
            title: "Logged in successfully",
          });
          setForm({ email: "", password: "" });
          setTimeout(() => router.push("/"), 2000);
        },
        onError: (error) => {
          let errorMessage = error.message;
          if (isAxiosError(error)) {
            errorMessage =
              (error.response?.data as { message?: string })?.message ||
              "An error occurred";
          }
          setSubmitted(false);
          setErrors({ form: errorMessage });
          addToast({
            color: "danger",
            title: errorMessage,
          });
        },
      }
    );
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-4">
          {/* <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
            Log In
          </h1>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Welcome back
          </p> */}
        </CardHeader>
        <CardBody className="pt-0">
          <Form
            onSubmit={handleSubmit}
            validationErrors={errors}
            onReset={() => setSubmitted(null)}
            className="space-y-6"
          >
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              label="Email"
              labelPlacement="outside"
              isRequired
              size="lg"
              className="w-full"
            />
            <Input
              errorMessage={errors.password}
              type={showPassword ? "text" : "password"}
              name="password"
              isRequired
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              label="Password"
              labelPlacement="outside"
              size="lg"
              className="w-full"
              endContent={
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOpenIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <EyeClosedIcon className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              }
            />
            <Button
              type="submit"
              isLoading={isPending}
              isDisabled={submitted === true}
              className="w-full"
              color="primary"
              size="lg"
            >
              {submitted === true
                ? "Logged In!"
                : isPending
                ? "Logging In..."
                : "Log In"}
            </Button>
          </Form>
          {submitted === true && (
            <div className="mt-4 text-center text-green-600 dark:text-green-400">
              Logged in successfully! Redirecting...
            </div>
          )}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
            </span>
            <Link
              href="/auth/signup"
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Sign Up
            </Link>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
