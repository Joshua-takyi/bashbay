"use client";

import Loader from "@/app/loading";
import { useAuthSession } from "@/hooks/useAuthSession";
import { Button, Modal, ModalContent, useDisclosure } from "@heroui/react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function ProfileSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isLoggedIn,
    userId,
    email,
    userRole,
    isLoading,
    username,
    joinedAt,
    fullname,
    is_verified,
  } = useAuthSession();

  if (isLoading) {
    return <Loader />;
  }

  const handleViewProfileImage = () => {
    onOpen();
  };

  return (
    <aside className="w-full max-w-sm">
      <div className="s">
        {/* Profile Header */}
        <div className="p-6 text-center">
          <div
            className="relative w-20 h-20 rounded-full overflow-hidden mx-auto cursor-pointer"
            onClick={handleViewProfileImage}
          >
            <Image
              src="/images/heroImage.jpg"
              alt="Profile Image"
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-3">
            <h2 className="text-lg font-semibold text-gray-900">
              {fullname || "Full Name"}
            </h2>
            <p className="text-gray-500 text-sm">@{username || "username"}</p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6 space-y-4">
          {/* Verification Status */}
          <div className="text-center">
            {is_verified ? (
              <span className="text-sm text-green-600">Verified</span>
            ) : (
              <span className="text-sm text-gray-500">Unverified</span>
            )}
          </div>

          {/* Bio Section */}
          <div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Passionate about creating amazing experiences. Love exploring new
              places and meeting interesting people. Always up for an adventure!
              🌟
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 py-3">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">24</div>
              <div className="text-xs text-gray-500">Events</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">156</div>
              <div className="text-xs text-gray-500">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">89</div>
              <div className="text-xs text-gray-500">Followers</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-1">
            <div className="text-sm text-gray-600">
              {email || "john@example.com"}
            </div>
            <div className="text-sm text-gray-600">
              Joined {joinedAt || new Date().getFullYear()}
            </div>
          </div>

          {/* Edit Profile Button */}
          <Link href={`/profile/edit/${userId}`}>
            <Button
              variant="bordered"
              radius="sm"
              startContent={<Pencil1Icon className="w-4 h-4" />}
              size="sm"
              className="w-full mt-4"
            >
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Image Modal */}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          size="5xl"
          onClose={onClose}
          placement="center"
          backdrop="opaque"
        >
          <ModalContent>
            <Image
              src="/images/heroImage.jpg"
              alt="Profile Image"
              width={800}
              height={800}
              className="rounded-md object-contain w-full"
            />
          </ModalContent>
        </Modal>
      )}
    </aside>
  );
}
