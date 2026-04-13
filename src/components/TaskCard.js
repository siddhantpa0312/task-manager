export default function TaskCard({ task, toggleTask, deleteTask }) {
  return (
    <div className="flex justify-between border p-2">
      <span
        onClick={() => toggleTask(task.id)}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {task.text}
      </span>

      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500"
      >
        X
      </button>
    </div>
  );
}