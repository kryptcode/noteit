import { createNoteSchema, deleteNoteSchema, updateNoteSchema } from "@/lib/validation/note";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parseResult = createNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.log(parseResult.error);

      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { title, content } = parseResult.data;

    const { userId } = auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const note = await prisma.note.create({
      data: {
        title,
        userId,
        content,
      },
    });

    return Response.json({ note }, { status: 201 });
  } catch (error) {
    console.error();
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const parseResult = deleteNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.log(parseResult.error);

      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id } = parseResult.data;

    const note = await prisma.note.findUnique({ where: { id } })

    if(!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    const { userId } = auth();

    if (!userId || userId !== note.userId ) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.note.delete({ where: { id }})

    return Response.json({ message: "Note deleted" }, { status: 200 })

  } catch (error) {
    console.error();
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const parseResult = updateNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.log(parseResult.error);

      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id ,title, content } = parseResult.data;

    const note = await prisma.note.findUnique({ where: { id } })

    if(!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    const { userId } = auth();

    if (!userId || userId !== note.userId ) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updateNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        content
      }
    })

    return Response.json({ updateNote }, { status: 200 })

  } catch (error) {
    console.error();
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
