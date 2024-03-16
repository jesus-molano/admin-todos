"use client";
import React, { startTransition, useOptimistic } from "react";
import { Todo } from "@prisma/client";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import styles from "./TodosItem.module.css";

interface TodosItemProps {
  todo: Todo;
  toggleTodo: (id: string, completed: boolean) => void;
}

export const TodosItem = ({ todo, toggleTodo }: TodosItemProps) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      completed: newCompleteValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed));
      toggleTodo(todoOptimistic.id, !todoOptimistic.completed);
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed));
    }
  };

  return (
    <div
      className={
        todoOptimistic.completed ? styles.todoDone : styles.todoPending
      }
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          onClick={() => onToggleTodo()}
          className={`
            flex p-2 rounded-md cursor-pointer bg-blue-100 select-none
            hover:bg-opacity-60
            ${
              todoOptimistic.completed
                ? "text-blue-500"
                : "text-rose-400 bg-rose-200"
            }
          `}
        >
          {todoOptimistic.completed ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className="text-center sm:text-left cursor-default select-none ">
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  );
};
