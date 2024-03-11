import { Todo } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

interface Args {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findUnique({
    where: { id },
  });
  return todo;
};

export async function GET(request: Request, { params }: Args) {
  const todo = await getTodo(params.id);
  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(todo);
}

export async function PUT(req: Request, { params }: Args) {
  const putSchema = yup.object({
    description: yup.string().optional(),
    completed: yup.boolean().optional(),
  });

  const todo = await getTodo(params.id);
  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  try {
    const { description, completed } = await putSchema.validate(
      await req.json()
    );
    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: { description, completed },
    });
    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
