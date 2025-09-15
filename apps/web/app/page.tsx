"use client";

import Feed from "@/components/dashboard/feed";
import PhotoUpload from "@/components/dashboard/photo-upload";
import Sidebar from "@/components/dashboard/sidebar";
import { Stories } from "@/components/dashboard/stories";
import { Fab } from "@/components/ui/fab";
import { trpc } from "@/lib/trpc/client";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const posts = trpc.postsRouter.findAll.useQuery();
  const createPost = trpc.postsRouter.create.useMutation({});

  const handleCreatePost = async (file: File, caption: string) => {
    console.log("Create post", file);
    const formData = new FormData();
    formData.append("image", file);

    const uploadResponse = await fetch("/api/upload/image", {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload image");
    }

    const { filename } = await uploadResponse.json();
    await createPost.mutateAsync({
      image: filename,
      caption,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Stories />
            <Feed posts={posts.data || []} />
          </div>
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Sidebar />
          </div>
        </div>
      </div>

      <PhotoUpload
        open={showUploadModal}
        onOpenChange={setShowUploadModal}
        onSubmit={handleCreatePost}
      />
      <Fab onClick={() => setShowUploadModal(true)}>
        <Plus className="h-6 w-6" />
      </Fab>
    </div>
  );
}
