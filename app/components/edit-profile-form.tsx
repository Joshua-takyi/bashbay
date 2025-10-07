"use client";

import { useAuthSession } from "@/hooks/useAuthSession";
import { Button, Form, Input, Textarea, Avatar, addToast } from "@heroui/react";
import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { useAuth } from "@/hooks/useAuth";

interface EditProfileFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function EditProfileForm({
  onSuccess,
  onCancel,
}: EditProfileFormProps) {
  const { user, refetch, userId } = useAuthSession();

  const [form, setForm] = useState({
    username: "",
    fullname: "",
    email: "",
    bio: "",
    location: "",
    phone_number: "",
  });

  //   const [avatarFile, setAvatarFile] = useState<File | null>(null);
  //   const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { useUpdateUser, getUserbyId } = useAuth();
  const { mutate: updateUser, isPending, isError } = useUpdateUser();
  const { data: userData, isLoading: isUserLoading } = getUserbyId(
    userId || ""
  );
  useEffect(() => {
    if (user) {
      setForm({
        username: userData?.username || "",
        fullname: userData?.fullname || "",
        email: userData?.email || "",
        bio: userData?.bio || "",
        location: userData?.location || "",
        phone_number: userData?.phone_number || "",
      });
      //   setAvatarPreview(user.avatar_url || "");
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!form.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (form.phone_number && !/^\+?[\d\s\-()]+$/.test(form.phone_number)) {
      newErrors.phone_number = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      addToast({
        color: "warning",
        title: "Please fix the form errors",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Append form fields
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      updateUser(
        {
          id: user?.user_id || "",
          username: form.username,
          fullname: form.fullname,
          bio: form.bio,
          phone_number: form.phone_number,
          location: form.location,
        },
        {
          onSuccess: async () => {
            addToast({
              color: "success",
              title: "Profile updated successfully",
            });

            // Refresh user data
            await refetch();

            // Call success callback
            onSuccess?.();
            setIsSubmitting(false);
          },
          onError: (error: AxiosError) => {
            const message =
              (error.response?.data as { message?: string })?.message ||
              "Failed to update profile";
            addToast({
              color: "danger",
              title: message,
            });
            setErrors({ form: message });
            setIsSubmitting(false);
          },
        }
      );
      //   // Append avatar file if selected
      //   if (avatarFile) {
      //     formData.append("avatar", avatarFile);
      //   }
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? (error.response?.data as { message?: string })?.message ||
            "An error occurred"
          : "An error occurred";
      addToast({
        color: "danger",
        title: message,
      });
      setErrors({ form: message });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validationErrors={errors}
      className="space-y-8 w-full"
    >
      {/* Form Fields Grid */}
      <div className="space-y-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            type="text"
            name="username"
            placeholder="johndoe"
            value={form.username}
            onChange={handleChange}
            label="Username"
            labelPlacement="outside"
            isRequired
            radius="sm"
            size="lg"
            variant="bordered"
            className="w-full"
            errorMessage={errors.username}
            isInvalid={!!errors.username}
            classNames={{
              label:
                "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
              input: "text-sm",
              inputWrapper: "h-12",
            }}
          />

          <Input
            type="text"
            name="fullname"
            placeholder="John Doe"
            value={form.fullname}
            onChange={handleChange}
            label="Full Name"
            labelPlacement="outside"
            isRequired
            radius="sm"
            size="lg"
            variant="bordered"
            className="w-full"
            errorMessage={errors.fullname}
            isInvalid={!!errors.fullname}
            classNames={{
              label:
                "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
              input: "text-sm",
              inputWrapper: "h-12",
            }}
          />
        </div>

        <Input
          type="email"
          name="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={handleChange}
          label="Email Address"
          labelPlacement="outside"
          isRequired
          radius="sm"
          disabled
          size="lg"
          variant="flat"
          className="w-full"
          errorMessage={errors.email}
          isInvalid={!!errors.email}
          classNames={{
            label:
              "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
            input: "text-sm",
            inputWrapper: "h-12",
          }}
        />

        <Textarea
          name="bio"
          placeholder="Tell us a little about yourself..."
          value={form.bio}
          onChange={handleChange}
          label="Bio"
          labelPlacement="outside"
          radius="sm"
          size="lg"
          variant="bordered"
          className="w-full"
          minRows={4}
          maxRows={6}
          classNames={{
            label:
              "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
            input: "text-sm py-3",
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            type="text"
            name="location"
            placeholder="San Francisco, CA"
            value={form.location}
            onChange={handleChange}
            label="Location"
            labelPlacement="outside"
            radius="sm"
            size="lg"
            variant="bordered"
            className="w-full"
            classNames={{
              label:
                "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
              input: "text-sm",
              inputWrapper: "h-12",
            }}
          />

          <Input
            type="tel"
            name="phone_number"
            placeholder="+1 (555) 123-4567"
            value={form.phone_number}
            onChange={handleChange}
            label="Phone Number"
            labelPlacement="outside"
            radius="sm"
            size="lg"
            variant="bordered"
            className="w-full"
            errorMessage={errors.phone_number}
            isInvalid={!!errors.phone_number}
            classNames={{
              label:
                "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5",
              input: "text-sm",
              inputWrapper: "h-12",
            }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
        <Button
          type="button"
          variant="light"
          radius="sm"
          size="lg"
          className="flex-1 sm:flex-initial sm:min-w-[140px] font-medium"
          onClick={onCancel}
          isDisabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
          color="primary"
          radius="sm"
          size="lg"
          className="flex-1 sm:flex-initial sm:min-w-[160px] font-semibold"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Form>
  );
}
