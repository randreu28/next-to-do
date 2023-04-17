"use client";

import { useState } from "react";
import { useSupabase } from "@/components/SupabaseProvider";

export default function TodoCreator() {
  const { supabase } = useSupabase();
  const [newTodo, setNewTodo] = useState<string>("");

  async function addTodo() {
    if (newTodo === "") {
      return;
    }

    const { error } = await supabase.from("todos").insert({ title: newTodo });

    if (error) {
      alert("Error creating todo");
      console.error(error);
    } else {
      setNewTodo("");
    }
  }
  return (
    <div className="flex gap-2">
      <input
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
        className="p-2 rounded"
        type="text"
      />
      <button onClick={addTodo} className="my-auto p-2 rounded bg-gray-900">
        Add todo
      </button>
    </div>
  );
}
