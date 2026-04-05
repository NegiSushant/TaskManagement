"use client";

import { useState, FormEvent } from "react";
import { HTTP_BACKEND } from "../utils/config";
import { Task } from "../types";
import api from "../utils/api";

type EditTaskModalProps = {
  task: Task | null;
  onClose: () => void;
  onTaskUpdated: (updatedTask: Task) => void;
};

export default function EditTaskModal({
  task,
  onClose,
  onTaskUpdated,
}: EditTaskModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!task) return null;

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toISOString().split("T")[0]
    : "";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as string;
    const dateInput = formData.get("dueDate") as string;

    const dueDate = dateInput ? new Date(dateInput).toISOString() : undefined;

    try {
      const response = await api.put(`${HTTP_BACKEND}/task/update/${task.id}`, {
        title,
        description,
        priority,
        dueDate,
      });

      onTaskUpdated(response.data.task);
      onClose();
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#1e293b] border border-gray-800 p-8 rounded-xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Edit Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={task.title}
              className="w-full bg-[#020617] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={task.description || ""}
              className="w-full bg-[#020617] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                defaultValue={task.priority}
                className="w-full bg-[#020617] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div className="flex-1">
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Due Date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                defaultValue={formattedDate}
                className="w-full bg-[#020617] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
