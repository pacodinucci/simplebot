import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { roboto_mono, inter } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import HomeClient from "@/components/home-client";
import db from "@/lib/db";

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const userAssistants = await db.assistant.findMany({
    where: {
      userId,
    },
  });

  console.log(userAssistants);

  return (
    <div className="h-full p-4 space-y-2">
      <HomeClient assistants={userAssistants} />
    </div>
  );
}
