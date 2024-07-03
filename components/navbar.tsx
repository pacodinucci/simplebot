"use client";

import Image from "next/image";
import { roboto, oswald } from "@/lib/fonts";
import MainNav from "./main-nav";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16 cursor-pointer">
      <div className="flex gap-4 items-center" onClick={() => router.push("/")}>
        <Image src="/logo.svg" alt="simple-logo" height={40} width={40} />
        <h2
          className={`${
            oswald.className
          } ${"text-xl font-semibold logo_text antialiased text-zinc-900"}`}
        >
          Simple Bot
        </h2>
      </div>
      <MainNav />
      <div className="flex justify-center items-center">
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
