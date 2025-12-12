"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Home } from "lucide-react";

export function ProfileNavigation() {
  const router = useRouter();

  return (
    <div className="border-b sticky top-0 bg-background z-10">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
          <Home className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
