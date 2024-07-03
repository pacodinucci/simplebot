import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { assistantId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { name, description, instructions, seed, image } = body;

    if (!user || !user.id) {
      return new NextResponse("Unauthorized.", { status: 401 });
    }

    if (!params.assistantId) {
      return new NextResponse("Assistant ID is required.", { status: 400 });
    }

    if (!name || !description || !instructions || !seed || !image) {
      return new NextResponse("All fields are required.", { status: 400 });
    }

    const assistant = await db.assistant.update({
      where: { id: params.assistantId, userId: user.id },
      data: {
        name,
        description,
        instructions,
        seed,
        image,
      },
    });

    return NextResponse.json(assistant);
  } catch (error) {
    console.log("[ASSISTANT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
