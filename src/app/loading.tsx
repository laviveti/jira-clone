"use client";
import { Loader } from "lucide-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className='h-screen  flex flex-col items-center justify-center'>
      <Loader className='size-8 animate-spin text-muted-foreground' />
    </div>
  );
};

export default LoadingPage;
