"use client";

import { useState } from "react";

// COMPONENT: AddTaskForm
// PURPOSE: Controlled form that captures a new task title and sends it upward.
// TYPE: Client Component (uses input state + event handlers).
// PROPS: addTask(text) callback owned by TaskBoard to append task state.
export default function AddTaskForm({ addTask }) {
  // Input text is state because it changes on each keystroke from user input.
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    // Prevent full-page browser form submission; keep interaction in React.
    e.preventDefault();
    if (!text.trim()) return;

    // Callback flows up because TaskBoard owns the task array state.
    addTask(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task..."
      />
      <button
        type="submit"
        className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400"
      >
        Add
      </button>
    </form>
  );
}
