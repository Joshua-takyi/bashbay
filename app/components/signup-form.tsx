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
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function SignUpForm() {
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

  const { useCreateUser } = useAuth();
  const { mutate, isPending } = useCreateUser();

  const getPasswordError = (value: string) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }

    return null;
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const passwordError = getPasswordError(form.password);
    if (passwordError) {
      addToast({
        color: "warning",
        title: passwordError,
      });
      return;
    }
    if (form.email.trim() === "") {
      addToast({
        color: "warning",
        title: "Email is required",
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
            title: "User created successfully",
          });
          setForm({ email: "", password: "" });
          setTimeout(() => router.push("/auth/signin"), 2000);
        },
        onError: (error: AxiosError) => {
          setSubmitted(false);
          setErrors({ form: error.message });
          addToast({
            color: "danger",
            title: error.message,
          });
        },
      }
    );
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="pb-4">
          {/* <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
            Create Account
          </h1>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Sign up to get started
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
                ? "Account Created!"
                : isPending
                ? "Creating Account..."
                : "Sign Up"}
            </Button>
          </Form>
          {submitted === true && (
            <div className="mt-4 text-center text-green-600 dark:text-green-400">
              Account created successfully! Redirecting to login...
            </div>
          )}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
            </span>
            <Link
              href="/auth/signin"
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Log In
            </Link>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
