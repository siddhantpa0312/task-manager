// COMPONENT: TaskStats
// PURPOSE: Shows live task metrics and exposes clear-completed action.
// TYPE: Client-presentational component (receives state via props).
// PROPS: tasks array for derived counts, clearCompleted callback from TaskBoard.
export default function TaskStats({ tasks, clearCompleted }) {
  // Counts are derived from tasks to avoid duplicate/unsynced state.
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;

  return (
    <section className="mt-5 grid gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="flex flex-wrap items-center gap-3 text-slate-300">
        <p>Total: {total}</p>
        <p>Active: {active}</p>
        <p>Completed: {completed}</p>
      </div>
      <button
        onClick={clearCompleted}
        disabled={completed === 0}
        className="rounded-lg border border-rose-500/50 px-3 py-1.5 text-rose-300 transition hover:bg-rose-500/10 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Clear Completed
      </button>
    </section>
  );
}
