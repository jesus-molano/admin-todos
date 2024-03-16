export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { TodosGrid, NewTodo } from "@/todos";

export const metadata = {
  title: "List of Server Todos",
  description: "List of Server Todos",
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div className="flex flex-col gap-2 items-start">
      <span className="rounded-xl bg-yellow-200 font-semibold px-3 py-1">
        Server Actions
      </span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
