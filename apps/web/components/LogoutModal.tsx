"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogout = () => {
    setLoading(true);

    // Destroy the tokens from the browser's local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Redirect the user back to "/" 
    router.push("/");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#1e293b] border border-gray-800 p-8 rounded-xl w-full max-w-sm shadow-2xl text-center">
        {/* Logout Icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500/10 mb-4">
          <svg
            className="h-6 w-6 text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">Ready to leave?</h2>
        <p className="text-sm text-gray-400 mb-6">
          Are you sure you want to log out of your account? You will need to
          sign back in to access your tasks.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2 rounded-lg text-gray-300 bg-[#0f172a] hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 disabled:opacity-50 transition-colors"
          >
            {loading ? "Logging out..." : "Yes, Log Out"}
          </button>
        </div>
      </div>
    </div>
  );
}