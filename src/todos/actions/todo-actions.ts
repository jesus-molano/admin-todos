"use server";

import { getUserSessionServer } from "@/auth/actions/auth-actions";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sleep = async (seconds: number = 0) =>
  new Promise((r) => setTimeout(r, seconds * 1000));

export const toggleTodo = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  // Simulate a delay of 3 seconds
  await sleep(3);
  const user = await getUserSessionServer();
  if (!user) redirect("/api/auth/signin");

  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) throw new Error("Todo not found");

  const updatedTodo = await prisma.todo.update({
    where: { id, userId: user.id },
    data: { completed },
  });
  revalidatePath("/dashboard/server-todos");
  return updatedTodo;
};

export const createTodo = async (description: string) => {
  const user = await getUserSessionServer();
  if (!user) redirect("/api/auth/signin");
  try {
    const todo = await prisma.todo.create({
      data: { description, userId: user.id },
    });
    revalidatePath("/dashboard/server-todos");
    return todo;
  } catch (error) {
    return {
      message: "Error creating todo",
    };
  }
};

export const deleteCompletedTodos = async () => {
  const user = await getUserSessionServer();
  if (!user) redirect("/api/auth/signin");
  try {
    await prisma.todo.deleteMany({
      where: { completed: true, userId: user.id },
    });
    revalidatePath("/dashboard/server-todos");
  } catch (error) {
    return {
      message: "Error deleting todos",
    };
  }
};
