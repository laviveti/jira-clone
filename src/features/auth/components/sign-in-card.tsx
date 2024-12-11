import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";

export const SignInCard = () => {
  return (
    <Card className='w-full h-full md:w-[487px] border-none shadow-none'>
      <CardHeader className='flex items-center justify-center text-center p-7'>
        <CardTitle className='text-2xl'>Welcome back!</CardTitle>
      </CardHeader>
      <div className='px-7'>
        <DottedSeparator />
      </div>
      <CardContent className='p-7'>
        <form className='space-y-4'></form>
        <Input required type='email' value={""} onChange={() => {}} placeholder='Enter email address' disabled={false} />
      </CardContent>
    </Card>
  );
};
