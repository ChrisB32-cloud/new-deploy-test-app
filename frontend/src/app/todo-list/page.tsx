import TodoApp from "@/components/todo-app";

export default function TodoListPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-65px)] w-full max-w-5xl items-start justify-center px-4 py-10 sm:px-6">
      <TodoApp />
    </main>
  );
}
