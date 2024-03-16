"use server";

import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

const sleep = async (seconds: number = 0) =>
  new Promise((r) => setTimeout(r, seconds * 1000));

export const toggleTodo = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  // Simulate a delay of 3 seconds
  await sleep(3);

  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) throw new Error("Todo not found");

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed },
  });
  revalidatePath("/dashboard/server-todos");
  return updatedTodo;
};

export const createTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } });
    revalidatePath("/dashboard/server-todos");
    return todo;
  } catch (error) {
    return {
      message: "Error creating todo",
    };
  }
};

export const deleteCompletedTodos = async () => {
  try {
    await prisma.todo.deleteMany({ where: { completed: true } });
    revalidatePath("/dashboard/server-todos");
  } catch (error) {
    return {
      message: "Error deleting todos",
    };
  }
};
