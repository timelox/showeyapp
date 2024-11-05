"use client";

import { MediaUpload } from "@/components/upload/media-upload";

export default function UploadPage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Upload Media</h1>
      <MediaUpload />
    </div>
  );
}