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
import { Label } from "../ui/label";
import FileUploadArea from "../ui/file-upload-area";

interface PhotoUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (file: File, caption: string) => Promise<void>;
}

export default function PhotoUpload({
  open,
  onOpenChange,
  onSubmit,
}: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [caption, setCaption] = useState("");

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
    setCaption("");
  };

  const handleUpload = async () => {
    if (!selectedFile || !caption.trim()) return;

    setIsUploading(true);
    try {
      await onSubmit(selectedFile, caption.trim());
      clearSelection();
      onOpenChange(false);
    } catch (err) {
      console.error("Error creating post", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create new post</DialogTitle>
        </DialogHeader>

        {!preview ? (
          <FileUploadArea onFileSelect={handleFileSelect} />
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={preview}
                alt="Preivew"
                height={64}
                width={64}
                className="w-full h-64 object-cover rounded-lg"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                onClick={clearSelection}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <textarea
                id="caption"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={3}
                className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={clearSelection}
                disabled={isUploading}
              >
                Back
              </Button>
              <Button
                onClick={handleUpload}
                disabled={isUploading || !caption.trim()}
              >
                Share
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
