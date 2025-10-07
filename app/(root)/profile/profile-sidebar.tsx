"use client";

import Loader from "@/app/loading";
import { useAuthSession } from "@/hooks/useAuthSession";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Divider,
} from "@heroui/react";
import { Pencil1Icon, CameraIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import EditProfileForm from "@/app/components/edit-profile-form";
import ImageUpload from "@/app/components/image-upload";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function ProfileSidebar() {
  const {
    isOpen: isImageOpen,
    onOpen: onImageOpen,
    onClose: onImageClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isUploadOpen,
    onOpen: onUploadOpen,
    onClose: onUploadClose,
  } = useDisclosure();

  const { email, isLoading, is_verified, userId, isLoggedIn } =
    useAuthSession();
  const { getUserbyId } = useAuth();
  const { data: userData, isLoading: isUserLoading } = getUserbyId(
    userId || ""
  );

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  if (isLoading || isUserLoading) {
    return <Loader />;
  }

  const handleViewProfileImage = () => {
    onImageOpen();
  };

  const handleEditProfile = () => {
    onEditOpen();
  };

  const handleEditSuccess = () => {
    onEditClose();
  };

  const handleUpdateProfileImage = () => {
    onUploadOpen();
  };

  const handleImagesChange = (files: File[]) => {
    setUploadedFiles(files);
  };

  const handleUploadSubmit = async () => {
    if (uploadedFiles.length === 0) return;

    // TODO: Implement actual upload logic here
    console.log("Uploading image:", uploadedFiles[0]);

    // Close modal and reset after successful upload
    onUploadClose();
    setUploadedFiles([]);
  };

  return (
    <aside className="w-full max-w-sm sticky top-5">
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden">
        {/* Profile Header */}
        <div className="p-8 text-center">
          <div className="relative inline-block">
            <div
              className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer ring-2 ring-gray-100 dark:ring-zinc-800 hover:ring-gray-200 dark:hover:ring-zinc-700 transition-all"
              onClick={handleViewProfileImage}
            >
              <Image
                src="/images/heroImage.jpg"
                alt="Profile Image"
                fill
                className="object-cover"
              />
            </div>
            {/* Camera Icon */}
            <button
              onClick={handleUpdateProfileImage}
              className="absolute bottom-0 right-0 w-9 h-9 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 rounded-full flex items-center justify-center shadow-md transition-all border border-gray-200 dark:border-zinc-700"
              title="Update profile picture"
              aria-label="Update profile picture"
            >
              <CameraIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          <div className="mt-4 space-y-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {userData?.fullname || "Full Name"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{userData?.username || "username"}
            </p>
          </div>

          {/* Verification Badge */}
          {is_verified && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium rounded-full border border-green-200 dark:border-green-800">
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Verified
            </div>
          )}
        </div>

        <Divider className="bg-gray-100 dark:bg-zinc-800" />

        {/* Profile Content */}
        <div className="p-6 space-y-6">
          {/* Bio Section */}
          {userData?.bio && (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {userData.bio}
              </p>
            </div>
          )}

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <svg
                className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-700 dark:text-gray-300 break-all">
                {email || "john@example.com"}
              </span>
            </div>
            {userData?.created_at && (
              <div className="flex items-center gap-3 text-sm">
                <svg
                  className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  Joined {new Date(userData.created_at).getFullYear()}
                </span>
              </div>
            )}
          </div>

          <Divider className="bg-gray-100 dark:bg-zinc-800" />

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                24
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Events
              </div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                156
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Reviews
              </div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                89
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Followers
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          {isLoggedIn && (
            <>
              <Divider className="bg-gray-100 dark:bg-zinc-800" />
              <Button
                variant="flat"
                radius="lg"
                startContent={<Pencil1Icon className="w-4 h-4" />}
                className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 font-medium"
                onClick={handleEditProfile}
              >
                Edit Profile
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Upload Profile Image Modal */}
      <Modal
        isOpen={isUploadOpen}
        size="2xl"
        onClose={onUploadClose}
        placement="center"
        backdrop="opaque"
        classNames={{
          base: "bg-white dark:bg-zinc-900",
          backdrop: "bg-black/50",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 px-6 pt-6 pb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upload Profile Image
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">
              Choose a photo to update your profile picture
            </p>
          </ModalHeader>
          <ModalBody className="px-6 pb-6">
            <div className="space-y-4">
              <ImageUpload
                mode="multiple"
                maxFiles={1}
                maxFileSize={3}
                onImagesChange={handleImagesChange}
              />
              <div className="flex gap-3 pt-2">
                <Button
                  variant="bordered"
                  onPress={onUploadClose}
                  className="flex-1"
                  radius="lg"
                >
                  Cancel
                </Button>
                <Button
                  onPress={handleUploadSubmit}
                  isDisabled={uploadedFiles.length === 0}
                  className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  radius="lg"
                >
                  Upload Photo
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Profile Image Modal */}
      <Modal
        isOpen={isImageOpen}
        size="3xl"
        onClose={onImageClose}
        placement="center"
        backdrop="opaque"
        classNames={{
          base: "bg-white dark:bg-zinc-900",
          backdrop: "bg-black/80",
        }}
      >
        <ModalContent>
          <ModalBody className="p-0">
            <Image
              src="/images/heroImage.jpg"
              alt="Profile Image"
              width={800}
              height={800}
              className="rounded-lg object-contain w-full"
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditOpen}
        size="3xl"
        onClose={onEditClose}
        placement="center"
        backdrop="opaque"
        scrollBehavior="inside"
        classNames={{
          base: "max-h-[90vh] bg-white dark:bg-zinc-900",
          backdrop: "bg-black/50",
          body: "px-6 pb-6",
          wrapper: "items-center",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 px-6 pt-6 pb-4 border-b border-gray-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Profile
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">
              Update your profile information and manage your account
            </p>
          </ModalHeader>
          <ModalBody className="overflow-y-auto">
            <EditProfileForm
              onSuccess={handleEditSuccess}
              onCancel={onEditClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </aside>
  );
}
