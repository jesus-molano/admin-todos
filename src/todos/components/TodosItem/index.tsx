"use client";
import React from "react";
import { Todo } from "@prisma/client";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import styles from "./TodosItem.module.css";

interface TodosItemProps {
  todo: Todo;
  toggleTodo: (id: string, completed: boolean) => void;
}

export const TodosItem = ({ todo, toggleTodo }: TodosItemProps) => {
  return (
    <div className={todo.completed ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          onClick={() => toggleTodo(todo.id, !todo.completed)}
          className={`
            flex p-2 rounded-md cursor-pointer bg-blue-100
            hover:bg-opacity-60
            ${todo.completed ? "text-blue-500" : "text-rose-400 bg-rose-200"}
          `}
        >
          {todo.completed ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className="text-center sm:text-left">{todo.description}</div>
      </div>
    </div>
  );
};
