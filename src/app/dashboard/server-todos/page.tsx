export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { TodosGrid, NewTodo } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
  title: "List of Server Todos",
  description: "List of Server Todos",
};

export default async function ServerTodosPage() {
  const user = await getUserSessionServer();
  if (!user) redirect("/api/auth/signin");

  const todos = await prisma.todo.findMany({
    where: { userId: user?.id },
    orderBy: { description: "asc" },
  });

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
