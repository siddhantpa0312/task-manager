// COMPONENT: TaskCard
// PURPOSE: Displays one task row and forwards user actions to TaskBoard callbacks.
// TYPE: Presentational component.
// PROPS: task object, toggleTask(id), deleteTask(id) callbacks from parent state owner.
export default function TaskCard({ task, toggleTask, deleteTask }) {
  // Conditional class gives immediate visual feedback for completion status.
  const textClass = task.completed
    ? "text-slate-500 line-through"
    : "text-slate-100";

  return (
    <article className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
      <span
        onClick={() => toggleTask(task.id)}
        className={`${textClass} cursor-pointer transition hover:text-cyan-300`}
      >
        {task.text}
      </span>

      <button
        onClick={() => deleteTask(task.id)}
        className="rounded-md px-2 py-1 text-rose-400 transition hover:bg-rose-500/10"
        aria-label={`Delete ${task.text}`}
      >
        Delete
      </button>
    </article>
  );
}
