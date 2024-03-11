import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset") ?? "0");
  const limit = Number(searchParams.get("limit") ?? "10");

  if (isNaN(offset)) {
    return NextResponse.json({ error: "Invalid offset" }, { status: 400 });
  }
  if (isNaN(limit)) {
    return NextResponse.json({ error: "Invalid limit" }, { status: 400 });
  }

  const todos = await prisma.todo.findMany({
    skip: offset,
    take: limit,
  });
  return NextResponse.json({ todos });
}

const postSchema = yup.object({
  description: yup.string().required(),
  completed: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const { description, completed } = await postSchema.validate(
      await request.json()
    );
    const todo = await prisma.todo.create({ data: { completed, description } });
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
