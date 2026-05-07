"use client";

import { useEffect, useMemo, useState } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

const STORAGE_KEY = "simple-todo-items";

export default function Home() {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Todo[];
        setTodos(parsed);
      } catch {
        setTodos([]);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos, hydrated]);

  const filteredTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }, [todos, filter]);

  const remainingCount = todos.filter((todo) => !todo.completed).length;

  function addTodo() {
    const text = input.trim();
    if (!text) {
      return;
    }

    setTodos((current) => [
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
      },
      ...current,
    ]);
    setInput("");
  }

  function toggleTodo(id: string) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function deleteTodo(id: string) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    setTodos((current) => current.filter((todo) => !todo.completed));
  }

  return (
    <main className="flex min-h-screen items-start justify-center bg-zinc-100 px-4 py-10 text-zinc-900">
      <section className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold tracking-tight">Todo App</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Track a few tasks, finish them, and clear completed items.
        </p>

        <div className="mt-6 flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addTodo();
              }
            }}
            placeholder="Add a task"
            className="h-11 flex-1 rounded-lg border border-zinc-300 px-3 text-sm outline-none ring-emerald-200 transition focus:border-emerald-500 focus:ring"
          />
          <button
            onClick={addTodo}
            className="h-11 rounded-lg bg-emerald-600 px-4 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Add
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {(["all", "active", "completed"] as const).map((value) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
                filter === value
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        <ul className="mt-5 space-y-2">
          {filteredTodos.length === 0 ? (
            <li className="rounded-lg border border-dashed border-zinc-300 px-3 py-8 text-center text-sm text-zinc-500">
              No tasks here yet.
            </li>
          ) : (
            filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="h-4 w-4 accent-emerald-600"
                />
                <span
                  className={`flex-1 text-sm ${
                    todo.completed ? "text-zinc-400 line-through" : "text-zinc-800"
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="rounded-md px-2 py-1 text-xs font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>

        <footer className="mt-5 flex items-center justify-between gap-3 border-t border-zinc-200 pt-4 text-sm text-zinc-600">
          <p>
            {remainingCount} {remainingCount === 1 ? "task" : "tasks"} left
          </p>
          <button
            onClick={clearCompleted}
            className="rounded-md px-2 py-1 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-100"
          >
            Clear completed
          </button>
        </footer>
      </section>
    </main>
  );
}
