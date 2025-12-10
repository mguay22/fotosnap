"use client";

import { trpc } from "@/lib/trpc/client";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const params = useParams();
  const userId = params.userId as string;

  const { data: profile, isLoading } = trpc.usersRouter.getUserProfile.useQuery(
    {
      userId,
    }
  );
  console.log(profile);
}
