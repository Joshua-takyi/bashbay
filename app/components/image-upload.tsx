"use client";

import { useState, useRef } from "react";
import { Button } from "@heroui/react";
import { UploadIcon, Cross2Icon, CameraIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface ImageUploadProps {
  mode?: "single" | "multiple";
  maxFiles?: number;
  maxFileSize?: number; // in MB
  onImagesChange?: (files: File[]) => void;
  onImagesRemove?: (index: number) => void;
  acceptedFormats?: string[];
  className?: string;
  showPreview?: boolean;
  previewClassName?: string;
}

interface PreviewImage {
  file: File;
  preview: string;
}

export default function ImageUpload({
  mode = "single",
  maxFiles = 5,
  maxFileSize = 5,
  onImagesChange,
  onImagesRemove,
  acceptedFormats = ["image/jpeg", "image/png", "image/webp", "image/jpg"],
  className = "",
  showPreview = true,
  previewClassName = "",
}: ImageUploadProps) {
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return `Invalid file type. Accepted formats: ${acceptedFormats
        .map((format) => format.split("/")[1].toUpperCase())
        .join(", ")}`;
    }

    const fileSizeMB = file.size / 1024 / 1024;
    if (fileSizeMB > maxFileSize) {
      return `File size exceeds ${maxFileSize}MB`;
    }

    return null;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const filesArray = Array.from(files);
    const newImages: PreviewImage[] = [];
    let errorMessage = "";

    // Check if we're exceeding max files for multiple mode
    if (mode === "multiple" && images.length + filesArray.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // For single mode, only take the first file
    const filesToProcess = mode === "single" ? [filesArray[0]] : filesArray;

    filesToProcess.forEach((file) => {
      const validationError = validateFile(file);
      if (validationError) {
        errorMessage = validationError;
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = {
          file,
          preview: reader.result as string,
        };

        setImages((prev) => {
          const updated = mode === "single" ? [newImage] : [...prev, newImage];

          // Call the callback with the files
          if (onImagesChange) {
            onImagesChange(updated.map((img) => img.file));
          }

          return updated;
        });
      };
      reader.readAsDataURL(file);
    });

    if (errorMessage) {
      setError(errorMessage);
      setTimeout(() => setError(""), 3000);
    } else {
      setError("");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);

      // Call the callback
      if (onImagesRemove) {
        onImagesRemove(index);
      }

      if (onImagesChange) {
        onImagesChange(updated.map((img) => img.file));
      }

      return updated;
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClearAll = () => {
    setImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onImagesChange) {
      onImagesChange([]);
    }
  };

  const canAddMore =
    mode === "single" ? images.length === 0 : images.length < maxFiles;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      {canAddMore && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 
            transition-all duration-200 cursor-pointer
            flex flex-col items-center justify-center
            min-h-[250px] group
            ${
              isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-default-300 hover:border-primary hover:bg-default-50"
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFormats.join(",")}
            onChange={handleInputChange}
            multiple={mode === "multiple"}
            className="hidden"
          />

          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadIcon className="w-8 h-8 text-primary" />
          </div>

          <h3 className="text-lg font-semibold mb-2">
            {isDragging ? "Drop your image here" : "Upload photo"}
          </h3>

          <p className="text-sm text-default-500 text-center mb-4">
            Drag and drop or click to browse
          </p>

          <div className="flex items-center gap-2 text-xs text-default-400">
            {acceptedFormats.map((format) => (
              <span
                key={format}
                className="px-3 py-1 bg-default-100 rounded-full uppercase"
              >
                {format.split("/")[1]}
              </span>
            ))}
          </div>

          <p className="text-xs text-default-400 mt-4">
            {mode === "multiple" && `Maximum ${maxFiles} files • `}
            Max size: {maxFileSize}MB per file
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm">
          {error}
        </div>
      )}

      {/* Preview Area */}
      {showPreview && images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              {mode === "single"
                ? "Selected Image"
                : `Selected Images (${images.length}/${maxFiles})`}
            </p>
            {mode === "multiple" && images.length > 1 && (
              <Button
                size="sm"
                variant="flat"
                color="danger"
                onPress={handleClearAll}
              >
                Clear All
              </Button>
            )}
          </div>

          <div
            className={
              mode === "single"
                ? "space-y-4"
                : `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${previewClassName}`
            }
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`
                  relative rounded-xl overflow-hidden bg-default-100 group
                  ${mode === "single" ? "p-8" : "aspect-square"}
                `}
              >
                <div
                  className={`
                    relative rounded-xl overflow-hidden shadow-lg
                    ${
                      mode === "single"
                        ? "w-full aspect-square max-w-md mx-auto"
                        : "w-full h-full"
                    }
                  `}
                >
                  <Image
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                  className={`
                    absolute w-8 h-8 rounded-full bg-danger text-danger-foreground 
                    hover:bg-danger/90 transition-all flex items-center justify-center 
                    shadow-lg opacity-0 group-hover:opacity-100
                    ${mode === "single" ? "top-4 right-4" : "top-2 right-2"}
                  `}
                  title="Remove image"
                >
                  <Cross2Icon className="w-4 h-4" />
                </button>

                {/* Image Info for single mode */}
                {mode === "single" && (
                  <div className="mt-4 flex items-center justify-between p-4 bg-default-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CameraIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{image.file.name}</p>
                        <p className="text-xs text-default-500">
                          {(image.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    {canAddMore && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="text-sm text-primary hover:underline"
                      >
                        Change
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* File names for multiple mode */}
          {mode === "multiple" && (
            <div className="space-y-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-default-50 rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CameraIcon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {image.file.name}
                      </p>
                      <p className="text-xs text-default-500">
                        {(image.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(index);
                    }}
                    className="ml-2 text-danger hover:text-danger/80 transition-colors"
                  >
                    <Cross2Icon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
