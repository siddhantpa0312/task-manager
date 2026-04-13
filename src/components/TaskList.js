import TaskCard from "./TaskCard";

export default function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <div className="space-y-2">
      {tasks.length === 0 && <p>No tasks found.</p>}

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}