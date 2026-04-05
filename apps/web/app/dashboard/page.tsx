"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import DashboardHeader from "../../components/DashboardHeader";
import AddTaskModal from "../../components/AddTaskModal";
import EditTaskModal from "../../components/EditTaskModal";
import TaskList from "../../components/TaskList";
import DeleteTaskModal from "../../components/DeleteTaskModal";
import { Task } from "../../types";
import api from "../../utils/api";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const filterFromUrl = searchParams.get("filter") || "ALL";

  const [statusFilter, setStatusFilter] = useState(filterFromUrl);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/task");
        setTasks(res.data.tasks);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    setStatusFilter(filterFromUrl);
  }, [filterFromUrl]);

  // Helper functions to update state locally after API calls
  const removeTaskFromState = (taskId: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const updateTaskInState = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    );
  };

  const handleTaskAdded = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const filteredTasks = tasks.filter((task) => {
    // Check if the title OR description matches the search box
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description?.toLowerCase() || "").includes(
        searchQuery.toLowerCase(),
      );

    // Check if the task matches the dropdown (or if "ALL" is selected)
    const matchesStatus =
      statusFilter === "ALL" || task.status === statusFilter;

    // Only keep the task if it matches BOTH the search and the dropdown
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-gray-200">
      <Sidebar />

      <main className="flex-1 p-10">
        <DashboardHeader onOpenModal={() => setIsModalOpen(true)} />

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#020617] border border-gray-800 px-4 py-2 rounded-lg w-72 focus:outline-none focus:border-indigo-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#020617] border border-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All</option>
            <option value="DONE">Completed</option>
            <option value="TODO">Pending</option>
          </select>
        </div>

        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onUpdate={updateTaskInState}
            onEditRequest={setTaskToEdit}
            onDeleteRequest={setTaskToDelete}
          />
        )}
      </main>
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskAdded={handleTaskAdded}
      />
      <EditTaskModal
        task={taskToEdit}
        onClose={() => setTaskToEdit(null)}
        onTaskUpdated={updateTaskInState}
      />
      <DeleteTaskModal
        task={taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onTaskDeleted={removeTaskFromState}
      />
    </div>
  );
}
