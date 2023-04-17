"use client";

import { Database } from "@/lib/db.types";
import { useEffect, useState } from "react";
import { useSupabase } from "./SupabaseProvider";
import Link from "next/link";

type Props = {
  initialTodos: Database["public"]["Tables"]["todos"]["Row"][];
};

export default function Todos() {
  const { supabase } = useSupabase();
  const [todos, setTodos] = useState<Props["initialTodos"]>();

  /* Initial fetch */
  useEffect(() => {
    async function getInitalTodos() {
      const { data, error } = await supabase
        .from("todos")
        .select()
        .order("is_completed");
      if (error) {
        alert("Error loading todos");
        console.error(error);
      } else {
        setTodos(data);
      }
    }

    getInitalTodos();
  }, [supabase]);

  /* Real-time revalidation */
  useEffect(() => {
    const channel = supabase
      .channel("todos")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "todos" },
        (payload) => {
          const newTodos = structuredClone(todos);
          if (newTodos === undefined) return;
          newTodos.unshift(payload.new as Props["initialTodos"][0]);
          setTodos(newTodos);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, todos]);

  if (todos === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {todos.length === 0 && <p>You do not have any to do yet!</p>}
      {todos.map((todo, key) => {
        return (
          <li className={todo.is_completed ? "line-through" : ""} key={key}>
            <Link href={"/" + todo.id} className="hover:underline">
              {todo.title}
            </Link>
          </li>
        );
      })}
    </>
  );
}
