import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TaskBoard from "./TaskBoard";

describe("Project 10 spec requirements", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(globalThis.crypto, "randomUUID").mockReturnValue("task-1");
  });

  it("R1: adds a task with controlled form and blocks blank input", async () => {
    const user = userEvent.setup();
    render(<TaskBoard />);

    const input = screen.getByPlaceholderText("Enter task...");
    const addButton = screen.getByRole("button", { name: "Add" });

    await user.type(input, "   ");
    await user.click(addButton);
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "Write unit tests");
    await user.click(addButton);

    expect(screen.getByText("Write unit tests")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("R2/R3/R4/R5: toggles, deletes, filters, and keeps stats in sync", async () => {
    const user = userEvent.setup();
    render(<TaskBoard />);

    const input = screen.getByPlaceholderText("Enter task...");
    await user.type(input, "Task A");
    await user.click(screen.getByRole("button", { name: "Add" }));

    vi.spyOn(globalThis.crypto, "randomUUID").mockReturnValueOnce("task-2");
    await user.type(input, "Task B");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText("Total: 2")).toBeInTheDocument();
    expect(screen.getByText("Active: 2")).toBeInTheDocument();
    expect(screen.getByText("Completed: 0")).toBeInTheDocument();

    await user.click(screen.getByText("Task A"));

    expect(screen.getByText("Completed: 1")).toBeInTheDocument();
    expect(screen.getByText("Active: 1")).toBeInTheDocument();
    expect(screen.getByText("Task A")).toHaveClass("line-through");

    await user.click(screen.getByRole("button", { name: "Done" }));
    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.queryByText("Task B")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "All" }));
    await user.click(screen.getByRole("button", { name: "Delete Task B" }));

    expect(screen.queryByText("Task B")).not.toBeInTheDocument();
    expect(screen.getByText("Total: 1")).toBeInTheDocument();
  });

  it("R6: clear completed removes only done tasks", async () => {
    const user = userEvent.setup();
    render(<TaskBoard />);

    const input = screen.getByPlaceholderText("Enter task...");
    await user.type(input, "Complete me");
    await user.click(screen.getByRole("button", { name: "Add" }));

    vi.spyOn(globalThis.crypto, "randomUUID").mockReturnValueOnce("task-2");
    await user.type(input, "Keep me");
    await user.click(screen.getByRole("button", { name: "Add" }));

    await user.click(screen.getByText("Complete me"));
    await user.click(
      screen.getByRole("button", { name: "Clear Completed" })
    );

    expect(screen.queryByText("Complete me")).not.toBeInTheDocument();
    expect(screen.getByText("Keep me")).toBeInTheDocument();
    expect(screen.getByText("Completed: 0")).toBeInTheDocument();
    expect(screen.getByText("Active: 1")).toBeInTheDocument();
  });

  it("R7: persists tasks to localStorage and reloads from it", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<TaskBoard />);

    await user.type(screen.getByPlaceholderText("Enter task..."), "Persisted");
    await user.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem("tasks"));
      expect(stored).toHaveLength(1);
      expect(stored[0].text).toBe("Persisted");
    });

    const presetTasks = [
      { id: "stored-1", text: "Loaded from storage", completed: false },
    ];
    localStorage.setItem("tasks", JSON.stringify(presetTasks));

    unmount();
    render(<TaskBoard />);
    expect(await screen.findByText("Loaded from storage")).toBeInTheDocument();
  });
});
