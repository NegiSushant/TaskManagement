"use client";

import { useState } from "react";
import api from "../utils/api";
import { Task } from "../types";

type TaskCardProps = {
  task: Task;
  onUpdate: (task: Task) => void;
  onEditRequest: (task: Task) => void;
  onDeleteRequest: (task: Task) => void;
};

export default function TaskCard({
  task,
  onUpdate,
  onEditRequest,
  onDeleteRequest,
}: TaskCardProps) {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);

    const newStatus = task.status === "DONE" ? "TODO" : "DONE";

    try {
      const response = await api.put(`/task/update/${task.id}`, {
        status: newStatus,
      });
      onUpdate(response.data.task);
    } catch (error) {
      console.error("Failed to update task status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setIsToggling(false);
    }
  };

  const isDone = task.status === "DONE";

  return (
    <div
      className={`border p-6 rounded-xl flex justify-between items-center transition-colors duration-200 ${
        isDone
          ? "bg-[#0f172a] border-gray-800 opacity-60"
          : "bg-[#1e293b] border-gray-700"
      }`}
    >
      <div>
        <h3
          className={`font-semibold text-lg ${isDone ? "line-through text-gray-500" : "text-white"}`}
        >
          {task.title}
        </h3>

        {task.description && (
          <p className="text-sm text-gray-400 mt-1 line-clamp-1">
            {task.description}
          </p>
        )}

        <div className="flex gap-3 mt-2 text-xs font-medium">
          <span
            className={`px-2 py-1 rounded-md ${
              isDone
                ? "bg-green-500/10 text-green-400"
                : "bg-yellow-500/10 text-yellow-400"
            }`}
          >
            {task.status}
          </span>
          <span className="px-2 py-1 rounded-md bg-gray-800 text-gray-300">
            Priority: {task.priority}
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        {/* The Toggle Button */}
        <button
          onClick={handleToggle}
          disabled={isToggling}
          className={`font-medium transition-colors ${
            isDone
              ? "text-gray-400 hover:text-gray-300"
              : "text-green-400 hover:text-green-300"
          } disabled:opacity-50`}
        >
          {isToggling ? "Updating..." : isDone ? "Mark Undone" : "Mark Done"}
        </button>

        {/* The Edit Button */}
        <button
          onClick={() => onEditRequest(task)}
          className="text-yellow-400 hover:text-yellow-300 font-medium"
        >
          Edit
        </button>

        {/* The Delete Button */}
        <button
          onClick={() => onDeleteRequest(task)}
          className="text-red-400 hover:text-red-300 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
