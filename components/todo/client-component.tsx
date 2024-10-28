"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

export default function ClientTodoComponent() {
  const [todos, setTodos] = useState<any[] | null>([]);
  const [title, setTitle] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const getTodos = async () => {
    const { data: todos, error } = await supabase.from("todos").select("*");
    if (error) console.error("Viga todo laadimisel:", error);
    setTodos(todos);
  };

  useEffect(() => {
    getTodos();
  }, [supabase]);

  const insertTodo = async () => {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ title }])
      .select();
    if (error) console.error("Viga todo lisamisel:", error);

    setTitle("");
    getTodos();
  };

  const deleteTodo = async (id: number) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) console.error("Viga todo kustutamisel:", error);

    getTodos();
  };

  const updateTodo = async (id: number, title: string) => {
    const { error } = await supabase
      .from("todos")
      .update({ title })
      .eq("id", id);
    if (error) console.error("Viga todo uuendamisel:", error);

    getTodos();
  };

  return (
    <main className="flex flex-col items-center gap-8">
      <Card className="w-full max-w-sm pt-3 pb-6 px-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center text-black">Kliendi Todod</h1>
        <Separator className="my-4" />

        <div className="todos space-y-4">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between gap-4 p-2"
            >
              <Input
                className="flex-1 text-lg"
                defaultValue={todo.title}
                onBlur={(event) => updateTodo(todo.id, event.target.value)}
              />
              <Button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white hover:bg-red-600 font-semibold"
              >
                Kustuta
              </Button>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="flex gap-4">
          <Input
            className="flex-1 text-lg"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Lisa uus todo"
          />
          <Button
            onClick={insertTodo}
            className="w-[93px] bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          >
            Lisa
          </Button>
        </div>
      </Card>
    </main>
  );
}