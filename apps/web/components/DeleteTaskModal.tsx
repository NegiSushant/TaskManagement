"use client";

import { useState } from "react";
import api from "../utils/api";
import { Task } from "../types";

type DeleteTaskModalProps = {
  task: Task | null;
  onClose: () => void;
  onTaskDeleted: (taskId: number) => void;
};

export default function DeleteTaskModal({
  task,
  onClose,
  onTaskDeleted,
}: DeleteTaskModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!task) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await api.delete(`/task/delete/${task.id}`);

      onTaskDeleted(task.id);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete task");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#1e293b] border border-gray-800 p-8 rounded-xl w-full max-w-sm shadow-2xl text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100/10 mb-4">
          <svg
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">Delete Task</h2>
        <p className="text-sm text-gray-400 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-200">"{task.title}"</span>?
          This action cannot be undone.
        </p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2 rounded-lg text-gray-300 bg-[#0f172a] hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
