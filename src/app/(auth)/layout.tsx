"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <main className='bg-neutral-100 min-h-screen'>
      <div className='mx-auto max-w-screen-2xl px-4 py-2'>
        <nav className='flex justify-between items-center'>
          <Image src='/logo.svg' alt='logo' width={152} height={56} />
          <Button asChild variant='secondary'>
            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>{isSignIn ? "Sign Up" : "Login"}</Link>
          </Button>
        </nav>
        <div className='flex flex-col items-center justify-center pt-4 md:pt-4'>{children}</div>
      </div>
    </main>
  );
}