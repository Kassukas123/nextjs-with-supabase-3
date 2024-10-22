"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ClientTodoComponent() {
  const [todos, setTodos] = useState<any[] | null>([]);
  const [title, setTitle] = useState("");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getTodos = async () => {
      let { data: todos, error } = await supabase.from("todos").select("*");
      setTodos(todos);
    };

    getTodos();
  }, []);

  const insertTodo = async () => {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ title: "Title" }])
      .select();

    router.refresh();

    console.log({ data, error });
  };

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        {JSON.stringify(todos)}
      </main>
      <Input onChange={(event) => setTitle(event.target.value)} />
      <Button onClick={insertTodo}>Insert Todo from Client</Button>
    </>
  );
}
