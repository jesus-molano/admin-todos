import prisma from "@/lib/prisma";
import { TodosGrid, NewTodo } from "@/todos";

export const metadata = {
  title: "List of Todos",
  description: "List of Todos",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
