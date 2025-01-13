"use client";
import { AlertTriangle } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className='h-screen  flex flex-col gap-y-2 items-center justify-center'>
      <AlertTriangle className='size-8 text-muted-foreground' />
      <p className='text-sm text-muted-foreground'>Something went wrong</p>
      <Button variant='secondary' size={"sm"}>
        <Link href='/'>Back to home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;