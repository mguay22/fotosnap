"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import FileUploadArea from "../ui/file-upload-area";
import { getImageUrl } from "@/lib/image";

interface AvatarUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (file: File) => Promise<void>;
  currentAvatar?: string | null;
}

export default function AvatarUpload({
  open,
  onOpenChange,
  onSubmit,
  currentAvatar,
}: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      await onSubmit(selectedFile);
      clearSelection();
      onOpenChange(false);
    } catch (err) {
      console.error("Error creating avatar", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
        </DialogHeader>

        {!preview ? (
          <div>
            <div className="space-y-4">
              {currentAvatar && (
                <div className="flex justify-center">
                  <Image
                    src={getImageUrl(currentAvatar)}
                    alt="Current avatar"
                    height={64}
                    width={64}
                    className="w-24 h-24 rounded-full object-cover border-2 border-muted"
                  />
                </div>
              )}
              <FileUploadArea onFileSelect={handleFileSelect} />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src={preview}
                  alt="Preivew"
                  height={64}
                  width={64}
                  className="w-32 h-32 rounded-full object-cover border-2 border-primary"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute -top-2 -right-2 bg-black/50 text-white hover:bg-black/70 rounded-full p-2"
                  onClick={clearSelection}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={clearSelection}
                disabled={isUploading}
              >
                Back
              </Button>
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? "Updating..." : "Update Avatar"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
