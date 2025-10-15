"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/react";
import {
  Cross2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";

interface ImageSectionProps {
  images: string[];
}

export default function ImageSection({ images }: ImageSectionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [errorImages, setErrorImages] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set([...prev, index]));
    if (index === 0) {
      setIsLoading(false);
    }
  };

  const handleImageError = (index: number) => {
    setErrorImages((prev) => new Set([...prev, index]));
    if (index === 0) {
      setIsLoading(false);
    }
  };

  // Filter out empty strings, null, undefined, and invalid images
  const validImages =
    images?.filter((img) => {
      if (!img || typeof img !== "string") return false;
      const trimmed = img.trim();
      if (trimmed === "") return false;
      // Basic URL validation
      try {
        return (
          trimmed.startsWith("http://") ||
          trimmed.startsWith("https://") ||
          trimmed.startsWith("/")
        );
      } catch {
        return false;
      }
    }) || [];

  // Limit displayed images to 5
  const maxDisplayImages = 5;
  const displayedImages = validImages.slice(0, maxDisplayImages);
  const remainingCount = validImages.length - maxDisplayImages;

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    onOpen();
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setSelectedImageIndex((prev) =>
        prev === 0 ? validImages.length - 1 : prev - 1
      );
    } else {
      setSelectedImageIndex((prev) =>
        prev === validImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  if (!validImages || validImages.length === 0) {
    return (
      <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <>
      {/* Image Grid */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 h-[300px] sm:h-[400px] lg:h-[50dvh]">
          {/* Left side - Large image taking full height */}
          <div
            className="relative cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-tl-lg sm:rounded-bl-lg sm:rounded-tr-none sm:rounded-br-none"
            onClick={() => openGallery(0)}
          >
            {/* Skeleton Loader for main image */}
            {!loadedImages.has(0) && (
              <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700">
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-300 dark:text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
            <Image
              src={displayedImages[0]}
              alt="Main venue image"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
              className="object-cover rounded-lg sm:rounded-tl-lg sm:rounded-bl-lg sm:rounded-tr-none sm:rounded-br-none"
              priority
              onLoad={() => handleImageLoad(0)}
              onError={() => handleImageError(0)}
              unoptimized={displayedImages[0]?.includes("placeholder")}
            />
            {errorImages.has(0) && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm text-gray-500">Image unavailable</p>
                </div>
              </div>
            )}
          </div>

          {/* Right side - Grid of 4 smaller images */}
          <div className="hidden sm:grid grid-cols-2 grid-rows-2 gap-2">
            {/* Top right image */}
            {displayedImages[1] && (
              <div
                className="relative cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-800"
                onClick={() => openGallery(1)}
              >
                {!loadedImages.has(1) && (
                  <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700">
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-300 dark:text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <Image
                  src={displayedImages[1]}
                  alt="Venue image 2"
                  fill
                  sizes="(max-width: 640px) 0vw, (max-width: 1024px) 25vw, 25vw"
                  className="object-cover"
                  onLoad={() => handleImageLoad(1)}
                  onError={() => handleImageError(1)}
                />
                {errorImages.has(1) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )}

            {displayedImages[2] && (
              <div
                className="relative cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-800"
                onClick={() => openGallery(2)}
              >
                {!loadedImages.has(2) && (
                  <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700">
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-300 dark:text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <Image
                  src={displayedImages[2]}
                  alt="Venue image 3"
                  fill
                  sizes="(max-width: 640px) 0vw, (max-width: 1024px) 25vw, 25vw"
                  className="object-cover rounded-tr-lg"
                  onLoad={() => handleImageLoad(2)}
                  onError={() => handleImageError(2)}
                />
                {errorImages.has(2) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )}

            {displayedImages[3] && (
              <div
                className="relative cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-800"
                onClick={() => openGallery(3)}
              >
                {!loadedImages.has(3) && (
                  <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700">
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-300 dark:text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <Image
                  src={displayedImages[3]}
                  alt="Venue image 4"
                  fill
                  sizes="(max-width: 640px) 0vw, (max-width: 1024px) 25vw, 25vw"
                  className="object-cover"
                  onLoad={() => handleImageLoad(3)}
                  onError={() => handleImageError(3)}
                />
                {errorImages.has(3) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )}

            {displayedImages[4] && (
              <div
                className="relative cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-800"
                onClick={() => openGallery(4)}
              >
                {!loadedImages.has(4) && (
                  <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700">
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-300 dark:text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <Image
                  src={displayedImages[4]}
                  alt="Venue image 5"
                  fill
                  sizes="(max-width: 640px) 0vw, (max-width: 1024px) 25vw, 25vw"
                  className="object-cover rounded-br-lg"
                  onLoad={() => handleImageLoad(4)}
                  onError={() => handleImageError(4)}
                />
                {errorImages.has(4) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
                {remainingCount > 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-br-lg">
                    <div className="flex items-center gap-2 text-white">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-lg font-semibold">
                        {remainingCount}+
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Screen Gallery Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        classNames={{
          base: "bg-black/95",
          backdrop: "bg-black/80",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Cross2Icon className="w-6 h-6 text-white" />
              </button>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <span className="text-white font-medium">
                  {selectedImageIndex + 1} / {images.length}
                </span>
              </div>

              <ModalBody className="p-0 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Previous Button */}
                  <button
                    onClick={() => navigateImage("prev")}
                    className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                  >
                    <ChevronLeftIcon className="w-8 h-8 text-white" />
                  </button>

                  {/* Image Display with Animation */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedImageIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto"
                    >
                      <Image
                        src={validImages[selectedImageIndex]}
                        alt={`Gallery image ${selectedImageIndex + 1}`}
                        fill
                        className="object-contain"
                        quality={100}
                        onError={(e) => {
                          console.error(
                            "Failed to load image:",
                            validImages[selectedImageIndex]
                          );
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Next Button */}
                  <button
                    onClick={() => navigateImage("next")}
                    className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
                  >
                    <ChevronRightIcon className="w-8 h-8 text-white" />
                  </button>
                </div>

                {/* Thumbnail Strip */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 max-w-4xl w-full px-4">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center">
                    {validImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative flex-shrink-0 w-20 h-20 overflow-hidden transition-opacity ${
                          idx === selectedImageIndex
                            ? "ring-2 ring-white ring-offset-2 ring-offset-black"
                            : "opacity-60"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
