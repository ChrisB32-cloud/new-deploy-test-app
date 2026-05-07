export default function Home() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-65px)] w-full max-w-5xl items-center justify-center px-4 py-10 sm:px-6">
      <section className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight">Simple Tools App</h1>
        <p className="mt-3 text-zinc-600">
          Use the top navigation to open Todo List, Calculator, or Calender.
        </p>
      </section>
    </main>
  );
}
