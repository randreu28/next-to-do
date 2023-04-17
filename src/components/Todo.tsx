"use client";

import { Database } from "@/lib/db.types";
import { useSupabase } from "@/components/SupabaseProvider";
import { useState } from "react";

type Props = Database["public"]["Tables"]["todos"]["Row"];

export default function Todo(initialTodo: Props) {
  const { supabase } = useSupabase();
  const [todo, setTodo] = useState<Props>(initialTodo);

  async function setCompletion() {
    let newTodo = structuredClone(todo);
    newTodo.is_completed = !newTodo.is_completed;

    const { error } = await supabase
      .from("todos")
      .update(newTodo)
      .eq("id", todo.id);

    if (error) {
      alert("Error updating todo");
      console.error(error);
    } else {
      setTodo(newTodo);
    }
  }
  return (
    <button onClick={setCompletion} className="flex gap-3">
      {todo.is_completed ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ) : (
        <svg
          className="text-white text-current w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 96 960 960"
          width="48"
          fill="currentColor"
          stroke="none"
        >
          <path d="M480 976q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z" />
        </svg>
      )}
      <span className={todo.is_completed ? "line-through" : ""}>
        {todo.title}
      </span>
    </button>
  );
}
