import TaskCard from "./TaskCard";

// COMPONENT: TaskList
// PURPOSE: Renders the current filtered view of tasks.
// TYPE: Presentational component.
// PROPS: tasks to display, plus toggleTask/deleteTask callbacks from TaskBoard.
export default function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <section className="mt-5 space-y-2">
      {/* Conditional render communicates empty state when no tasks match filter. */}
      {tasks.length === 0 && <p>No tasks found.</p>}

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </section>
  );
}
