import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { name, description, instructions, seed, image } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized.", { status: 401 });
    }

    if (!name || !description || !instructions || !seed || !image) {
      return new NextResponse("All fields are required.", { status: 400 });
    }

    const assistant = await db.assistant.create({
      data: {
        name,
        description,
        instructions,
        seed,
        userId: user.id,
        image,
      },
    });

    return NextResponse.json(assistant);
  } catch (error) {
    console.log("[ASSISTANT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

