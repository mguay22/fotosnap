import { StoryGroup } from "@repo/trpc/schemas";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { getImageUrl } from "@/lib/image";
import { ChevronLeft, ChevronRight, User, X } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface StoryViewerProps {
  storyGroups: StoryGroup[];
  open: boolean;
  initialGroupIndex: number;
  onOpenChange: (open: boolean) => void;
}

export function StoryViewer({
  storyGroups,
  open,
  onOpenChange,
  initialGroupIndex,
}: StoryViewerProps) {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(initialGroupIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentGroup = storyGroups[currentGroupIndex];
  const currentStory = currentGroup?.stories[currentStoryIndex];

  const handleNext = () => {
    if (!currentGroup) return;

    if (currentStoryIndex < currentGroup.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setProgress(0);
    } else {
      setCurrentStoryIndex(0);
      setProgress(0);
    }
  };

  const handlePrevious = () => {
    if (!currentGroup) return;

    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    }
  };

  useEffect(() => {
    if (open) {
      setCurrentGroupIndex(initialGroupIndex);
      setCurrentStoryIndex(0);
      setProgress(0);
    }
  }, [open, initialGroupIndex]);

  useEffect(() => {
    if (!open || !currentStory) return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentStory?.id, open]);

  const handleClose = () => {
    onOpenChange(false);
  };

  if (!currentGroup || !currentStory) {
    return null;
  }

  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="!max-w-md w-full h-[90vh] p-0 overflow-hidden bg-black"
        showCloseButton={false}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-2">
            {currentGroup.stories.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{
                    width:
                      index < currentStoryIndex
                        ? "100%"
                        : index === currentStoryIndex
                          ? `${progress}%`
                          : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="absolute top-4 left-0 right-0 z-20 flex items-center justify-between px-4 pt-2">
            <button
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              onClick={() => router.push(`/users/${currentGroup.userId}`)}
            >
              {currentGroup.avatar ? (
                <Image
                  src={getImageUrl(currentGroup.avatar)}
                  alt={currentGroup.username}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border-2 border-white">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
              <div>
                <div className="text-white font-semibold text-sm">
                  {currentGroup.username}
                </div>
              </div>
            </button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="relative w-full h-full">
            <Image
              src={getImageUrl(currentStory.image)}
              alt="Story"
              fill
              className="object-contain"
            />
          </div>

          {(currentGroupIndex > 0 || currentStoryIndex > 0) && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
