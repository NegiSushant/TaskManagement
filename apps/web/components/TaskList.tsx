"use client";

import TaskCard from "./TaskCard";
import { Task } from "../types";

type TaskListProps = {
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onEditRequest: (task: Task) => void;
  onDeleteRequest: (task: Task) => void;
};

export default function TaskList({
  tasks,
  onUpdate,
  onEditRequest,
  onDeleteRequest,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="text-gray-500 text-center py-10">
        No tasks found. Create one!
      </p>
    );
  }

  return (
    <div className="grid gap-6">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onEditRequest={onEditRequest}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </div>
  );
}
