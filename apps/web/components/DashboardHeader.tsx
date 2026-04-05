"use client";

type DashboardHeaderProps = {
  onOpenModal: () => void;
};

// Pass the props into the component
export default function DashboardHeader({ onOpenModal }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold">My Tasks</h2>

      <button
        className="bg-indigo-500 px-5 py-2 rounded-lg hover:bg-indigo-600"
        onClick={onOpenModal}
      >
        + Add Task
      </button>
    </div>
  );
}

