# ImageUpload Component Usage

A reusable image upload component with drag-and-drop support, preview, and validation.

## Features

- ✅ Single or multiple image upload
- ✅ Drag and drop support
- ✅ File validation (type and size)
- ✅ Image preview
- ✅ Individual image removal
- ✅ Responsive design
- ✅ HeroUI theme integration

## Props

```typescript
interface ImageUploadProps {
  mode?: "single" | "multiple"; // Upload mode (default: "single")
  maxFiles?: number; // Max files for multiple mode (default: 5)
  maxFileSize?: number; // Max file size in MB (default: 5)
  onImagesChange?: (files: File[]) => void; // Callback when images change
  onImagesRemove?: (index: number) => void; // Callback when image is removed
  acceptedFormats?: string[]; // Accepted MIME types
  className?: string; // Additional CSS classes
  showPreview?: boolean; // Show image preview (default: true)
  previewClassName?: string; // Preview container classes
}
```

## Usage Examples

### Single Image Upload

```tsx
import ImageUpload from "@/app/components/image-upload";
import { useState } from "react";

export default function ProfileUpload() {
  const [profileImage, setProfileImage] = useState<File[]>([]);

  const handleImageChange = (files: File[]) => {
    setProfileImage(files);
    console.log("Selected image:", files[0]);
  };

  return (
    <ImageUpload
      mode="single"
      maxFileSize={5}
      onImagesChange={handleImageChange}
    />
  );
}
```

### Multiple Images Upload

```tsx
import ImageUpload from "@/app/components/image-upload";
import { useState } from "react";

export default function VenueImagesUpload() {
  const [venueImages, setVenueImages] = useState<File[]>([]);

  const handleImagesChange = (files: File[]) => {
    setVenueImages(files);
    console.log("Selected images:", files);
  };

  const handleImageRemove = (index: number) => {
    console.log("Removed image at index:", index);
  };

  return (
    <ImageUpload
      mode="multiple"
      maxFiles={10}
      maxFileSize={8}
      onImagesChange={handleImagesChange}
      onImagesRemove={handleImageRemove}
      acceptedFormats={["image/jpeg", "image/png", "image/webp"]}
    />
  );
}
```

### With Custom Styling

```tsx
import ImageUpload from "@/app/components/image-upload";

export default function CustomStyledUpload() {
  const handleImagesChange = (files: File[]) => {
    // Handle upload
  };

  return (
    <ImageUpload
      mode="multiple"
      maxFiles={6}
      className="my-custom-class"
      previewClassName="gap-6"
      onImagesChange={handleImagesChange}
    />
  );
}
```

### In a Modal (Profile Example)

```tsx
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";
import ImageUpload from "@/app/components/image-upload";
import { useState } from "react";

export default function ProfileImageModal({ isOpen, onClose }) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) return;

    // Upload logic here
    console.log("Uploading:", uploadedFiles[0]);

    onClose();
    setUploadedFiles([]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalContent>
        <ModalHeader>
          <h2>Upload Profile Image</h2>
        </ModalHeader>
        <ModalBody className="p-8">
          <ImageUpload
            mode="single"
            maxFileSize={5}
            onImagesChange={setUploadedFiles}
          />

          <div className="flex gap-3 mt-6">
            <Button variant="bordered" onPress={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleSubmit}
              isDisabled={uploadedFiles.length === 0}
              className="flex-1"
            >
              Upload
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
```

### Venue Images with Multiple Upload

```tsx
import ImageUpload from "@/app/components/image-upload";
import { useState } from "react";
import { Button } from "@heroui/react";

export default function VenueForm() {
  const [venueImages, setVenueImages] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (venueImages.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    // Create FormData for upload
    const formData = new FormData();
    venueImages.forEach((file, index) => {
      formData.append(`image_${index}`, file);
    });

    // Submit to API
    // await fetch("/api/venues", { method: "POST", body: formData });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Venue Images</h3>
        <p className="text-sm text-default-500 mb-4">
          Upload up to 10 high-quality images of your venue
        </p>

        <ImageUpload
          mode="multiple"
          maxFiles={10}
          maxFileSize={8}
          onImagesChange={setVenueImages}
        />
      </div>

      <Button
        type="submit"
        color="primary"
        isDisabled={venueImages.length === 0}
        className="w-full"
      >
        Create Venue ({venueImages.length} images)
      </Button>
    </form>
  );
}
```

## Accepted File Formats

By default, the component accepts:

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)

You can customize this with the `acceptedFormats` prop:

```tsx
<ImageUpload
  acceptedFormats={["image/jpeg", "image/png", "image/gif", "image/svg+xml"]}
/>
```

## File Size Validation

The component validates file sizes and shows an error if a file exceeds the limit:

```tsx
<ImageUpload
  maxFileSize={10} // 10MB max
/>
```

## API Integration Example

```tsx
const handleUpload = async (files: File[]) => {
  const formData = new FormData();

  files.forEach((file, index) => {
    formData.append(`images[${index}]`, file);
  });

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Upload successful:", data);
    }
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

<ImageUpload mode="multiple" onImagesChange={handleUpload} />;
```

## Styling

The component uses HeroUI's theme colors and can be customized:

```tsx
<ImageUpload
  className="border-2 border-primary rounded-2xl p-4"
  previewClassName="gap-8 grid-cols-3"
/>
```

## Notes

- Images are stored in component state as preview URLs
- Original File objects are passed to callbacks
- Preview images are automatically generated using FileReader
- Component handles all drag-and-drop interactions
- Responsive design works on mobile and desktop
