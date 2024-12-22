"use client";

import React from "react";
import { useCurrent } from "@/features/auth/api/use-current";
import { useRouter } from "next/navigation";
import { useLogout } from "@/features/auth/api/use-logout";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useCurrent();
  const { mutate } = useLogout();

  React.useEffect(() => {
    if (!isLoading && !data) {
      router.push("/sign-in");
    }
  }, [data, isLoading, router]);

  return (
    <div className='flex p-2 gap-3 flex-col'>
      Only authenticated users can see this
      <Button onClick={() => mutate()}>Logout</Button>
    </div>
  );
}
