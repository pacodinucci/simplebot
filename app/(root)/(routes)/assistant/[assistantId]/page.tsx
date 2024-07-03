import { auth } from "@clerk/nextjs/server";

import db from "@/lib/db";
import { redirect } from "next/navigation";
import { AssistantForm } from "./components/assistant-form";

interface AssistantPageProps {
  params: {
    assistantId: string;
  };
}

const AssistantIdPage = async ({ params }: AssistantPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const assistant = await db.assistant.findUnique({
    where: {
      id: params.assistantId,
      userId,
    },
  });

  return <AssistantForm initialData={assistant} />;
};

export default AssistantIdPage;
