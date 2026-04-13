import TaskBoard from "../components/TaskBoard";

// COMPONENT: Home Page
// PURPOSE: Server-rendered route entry that hosts the TaskBoard client component.
// TYPE: Server Component (no client hooks/events here).
// PROPS: None (route-level component).
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6">
      <TaskBoard />
    </main>
  );
}