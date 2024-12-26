import React from "react";

import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/actions";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  console.log({ user });

  return <div>This is a home page</div>;
}
