"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AddAssistantModal } from "@/components/modals/add-assistant-modal";
import { useAssistantModal } from "@/hooks/use-assistant-modal";
import { roboto, roboto_mono } from "@/lib/fonts";

interface Assistant {
  id: string;
  name: string;
  description: string;
  instructions: string;
  seed: string;
  image: string;
}

interface HomeClientProps {
  assistants: Assistant[];
}

const HomeClient = ({ assistants }: HomeClientProps) => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const assistantModal = useAssistantModal();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="h-full p-4 space-y-2">
      {/* <Button onClick={assistantModal.onOpen}>New Assistant</Button> */}
      <h2 className={`${roboto_mono.className} ${"text-2xl"}`}>
        Welcome back, {user.firstName}
      </h2>
      <div className="bg-slate-200 p-4 flex flex-col gap-4">
        <h3 className="font-semibold text-lg">Your assistants</h3>
        <div className="flex gap-4">
          {assistants.map((assistant) => (
            <div
              key={assistant.id}
              className="border-2 rounded-lg bg-white shadow-md p-4 flex flex-col justify-center items-center gap-2 cursor-pointer"
              onClick={() => router.push(`/assistant/${assistant.id}`)}
            >
              <h4 className="font-semibold text-lg">{assistant.name}</h4>
              <Image
                src={assistant.image}
                width={100}
                height={100}
                alt="assistant-image"
              />
              <p className="text-xs max-w-20 text-center">
                {assistant.description}
              </p>
            </div>
          ))}
          {/* <div className="border-2 border-dashed rounded-lg border-gray-600 h-[150px] w-[150px] flex justify-center items-center text-center"> */}
          {assistants.length === 0 ? (
            <div className="flex flex-col justify-center p-2 gap-4">
              <h4>
                Describe in detail your assistant&apos;s backstory and relevant
                details.
              </h4>
              <Button
                className="w-1/2"
                onClick={() => router.push("/assistant/new")}
              >
                Create your first assistant
              </Button>
            </div>
          ) : (
            <div
              className="border-2 border-dashed rounded-lg border-gray-600/40 w-[120px] flex justify-center items-center text-center cursor-pointer"
              onClick={() => router.push("/assistant/new")}
            >
              <CirclePlus size={50} color="#9ca3af" />
            </div>
          )}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default HomeClient;
