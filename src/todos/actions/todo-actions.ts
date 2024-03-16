"use server";

import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) throw new Error("Todo not found");

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed },
  });
  revalidatePath("/dashboard/server-todos");
  return updatedTodo;
};