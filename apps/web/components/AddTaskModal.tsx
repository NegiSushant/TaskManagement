"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import { HTTP_BACKEND } from "../utils/config";
import { Task } from "../types";
import api from "../utils/api";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: (newTask: Task) => void;
};

export default function AddTaskModal({
  isOpen,
  onClose,
  onTaskAdded,
}: AddTaskModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    // Extract data from form
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as string;
    const dateInput = formData.get("dueDate") as string;

    // Our Zod backend expects a strict ISO datetime string, so we convert the HTML date format
    const dueDate = dateInput ? new Date(dateInput).toISOString() : undefined;

    try {
      const response = await api.post(`${HTTP_BACKEND}/task/create`, {
        title,
        description,
        priority,
        dueDate,
      });

      // Pass the newly created task back to the parent to update the UI
      onTaskAdded(response.data.task);

      // Close the modal
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to create task");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#1e293b] border border-gray-800 p-8 rounded-xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Create New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
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
              placeholder="e.g., Finish backend API"
              className="w-full bg-[#020617] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Description */}
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
              placeholder="Add some details..."
              className="w-full bg-[#020617] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Priority & Due Date (Side by Side) */}
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
                defaultValue="MEDIUM"
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
                className="w-full bg-[#020617] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 disabled:opacity-50 transition-colors"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
