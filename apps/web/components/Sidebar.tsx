"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import LogoutModal from "./LogoutModal";

export default function Sidebar() {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "ALL";

  // Add state to control the modal
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <>
      <aside className="w-64 min-h-screen bg-[#020617] border-r border-gray-800 p-6 flex flex-col">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-indigo-400 mb-10">TaskFlow</h1>

          <nav className="flex flex-col gap-4">
            <Link
              href="/dashboard"
              className={`${currentFilter === "ALL" ? "text-indigo-400 font-semibold" : "text-gray-300"} hover:text-indigo-400 transition-colors`}
            >
              Dashboard
            </Link>

            <Link
              href="/dashboard?filter=DONE"
              className={`${currentFilter === "DONE" ? "text-indigo-400 font-semibold" : "text-gray-300"} hover:text-indigo-400 transition-colors`}
            >
              Completed Tasks
            </Link>

            <Link
              href="/dashboard?filter=TODO"
              className={`${currentFilter === "TODO" ? "text-indigo-400 font-semibold" : "text-gray-300"} hover:text-indigo-400 transition-colors`}
            >
              Pending Tasks
            </Link>
          </nav>
        </div>

        <div className="mt-auto border-t border-gray-800 pt-6">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex w-full items-center gap-2 text-gray-400 hover:text-red-400 font-medium transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            Log Out
          </button>
        </div>
      </aside>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}

// "use client";

// import Link from "next/link";
// import { useSearchParams } from "next/navigation";

// export default function Sidebar() {
//   const searchParams = useSearchParams();
//   const currentFilter = searchParams.get("filter") || "ALL";

//   return (
//     <aside className="w-64 min-h-screen bg-[#020617] border-r border-gray-800 p-6">
//       <h1 className="text-xl font-bold text-indigo-400 mb-10">TaskFlow</h1>

//       <nav className="flex flex-col gap-4">
//         <Link
//           href="/dashboard"
//           className={`${currentFilter === "ALL" ? "text-indigo-400 font-semibold" : "text-gray-300"} hover:text-indigo-400 transition-colors`}
//         >
//           Dashboard
//         </Link>

//         <Link
//           href="/dashboard?filter=DONE"
//           className={`${currentFilter === "DONE" ? "text-indigo-400 font-semibold" : "text-gray-300"} hover:text-indigo-400 transition-colors`}
//         >
//           Completed Tasks
//         </Link>

//         <Link
//           href="/dashboard?filter=TODO"
//           className={`${currentFilter === "TODO" ? "text-indigo-400 font-semibold" : "text-gray-300"} hover:text-indigo-400 transition-colors`}
//         >
//           Pending Tasks
//         </Link>
//       </nav>
//     </aside>
//   );
// }

// "use client";

// import Link from "next/link";

// export default function Sidebar() {
//   return (
//     <aside className="w-64 h-screen bg-[#020617] border-r border-gray-800 p-6">
//       <h1 className="text-xl font-bold text-indigo-400 mb-10">TaskFlow</h1>

//       <nav className="flex flex-col gap-4">
//         <Link href="/dashboard" className="text-gray-300 hover:text-indigo-400">
//           Dashboard
//         </Link>

//         <Link
//           href="/dashboard/completed"
//           className="text-gray-300 hover:text-indigo-400"
//         >
//           Completed Tasks
//         </Link>

//         <Link
//           href="/dashboard/pending"
//           className="text-gray-300 hover:text-indigo-400"
//         >
//           Pending Tasks
//         </Link>
//       </nav>
//     </aside>
//   );
// }
