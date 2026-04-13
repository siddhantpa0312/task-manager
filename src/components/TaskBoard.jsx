"use client";

import { useEffect, useState } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";
import TaskStats from "./TaskStats";

// COMPONENT: TaskBoard
// PURPOSE: Owns task + filter state, coordinates task actions, and persists tasks.
// TYPE: Client Component (uses hooks and browser localStorage).
// PROPS: None. This is the top-level state owner for task features.
export default function TaskBoard() {
  // tasks must be state because user actions mutate this source of truth over time.
  // Start with a deterministic default so server and client first render match.
  const [tasks, setTasks] = useState([]);

  // We track hydration so we do not overwrite saved tasks with [] before reading storage.
  const [isHydrated, setIsHydrated] = useState(false);

  // Filter has independent lifecycle from tasks, so it is separate state.
  const [filter, setFilter] = useState("all");

  // Load persisted tasks only after mount (client-only side effect).
  // This moves browser-only logic out of render and avoids hydration mismatches.
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];

    // Schedule state updates after the effect tick to satisfy hook lint rules.
    queueMicrotask(() => {
      setTasks(parsedTasks);
      setIsHydrated(true);
    });
  }, []);

  // Persist tasks after hydration so refresh keeps latest state.
  // Dependency [tasks, isHydrated] ensures we never write before initial load.
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, isHydrated]);

  const addTask = (text) => {
    // New object + new array keeps updates immutable for React change detection.
    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const toggleTask = (id) => {
    // map returns a new array so React sees a changed reference and re-renders.
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    // filter creates a new array; we avoid mutating the previous state array.
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  const clearCompleted = () => {
    // Single action removes all completed tasks while preserving active tasks.
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  // This value is intentionally derived from tasks each render.
  // Keeping it out of state avoids duplicated state bugs.
  const completedCount = tasks.filter((task) => task.completed).length;

  // Derived filtering keeps one source of truth (tasks) and one view selector (filter).
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "done") return task.completed;
    return true;
  });

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950/30">
      <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Project 10
          </p>
          <h1 className="text-3xl font-semibold text-slate-100">Task Manager</h1>
        </div>
        <p className="text-sm text-slate-400">
          Stay focused with a simple done workflow.
        </p>
      </header>

      <AddTaskForm addTask={addTask} />

      <TaskStats tasks={tasks} clearCompleted={clearCompleted} />

      <div className="mt-5 grid gap-4 rounded-xl bg-slate-950/60 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="inline-flex w-fit rounded-lg bg-slate-800 p-1">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-md px-3 py-1.5 text-sm transition ${
              filter === "all"
                ? "bg-slate-200 text-slate-900"
                : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`rounded-md px-3 py-1.5 text-sm transition ${
              filter === "active"
                ? "bg-slate-200 text-slate-900"
                : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("done")}
            className={`rounded-md px-3 py-1.5 text-sm transition ${
              filter === "done"
                ? "bg-slate-200 text-slate-900"
                : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            Done
          </button>
        </div>
        <p className="text-sm text-slate-400">
          {completedCount === 0
            ? "No completed tasks yet."
            : `${completedCount} task${completedCount > 1 ? "s" : ""} completed`}
        </p>
      </div>

      <TaskList
        tasks={filteredTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </section>
  );
}