import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-gray-200">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-gray-800">
        <h1 className="text-xl font-bold text-indigo-400">TaskFlow</h1>

        <div className="flex gap-6 items-center">
          <Link href="/signin" className="hover:text-indigo-400 transition">
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-indigo-500 px-5 py-2 rounded-lg text-white hover:bg-indigo-600 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28">
        <h1 className="text-5xl font-bold leading-tight max-w-3xl">
          Manage Your Tasks
          <span className="text-indigo-400"> Smarter</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-xl text-lg">
          A modern task management system built with Next.js and Node.js. Stay
          organized, productive, and focused on what matters most.
        </p>

        <div className="flex gap-5 mt-10">
          <Link
            href="/signup"
            className="bg-indigo-500 px-6 py-3 rounded-lg hover:bg-indigo-600 transition"
          >
            Start Managing Tasks
          </Link>

          <Link
            href="/signin"
            className="border border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-8">
        <h2 className="text-3xl font-bold text-center mb-16">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-[#1e293b] p-8 rounded-xl border border-gray-800 hover:border-indigo-500 transition">
            <h3 className="text-xl font-semibold mb-3 text-indigo-400">
              Secure Authentication
            </h3>

            <p className="text-gray-400">
              Secure login system with JWT authentication using access and
              refresh tokens for protected routes.
            </p>
          </div>

          <div className="bg-[#1e293b] p-8 rounded-xl border border-gray-800 hover:border-indigo-500 transition">
            <h3 className="text-xl font-semibold mb-3 text-indigo-400">
              Task CRUD
            </h3>

            <p className="text-gray-400">
              Create, update, delete and toggle task status with an intuitive
              task dashboard.
            </p>
          </div>

          <div className="bg-[#1e293b] p-8 rounded-xl border border-gray-800 hover:border-indigo-500 transition">
            <h3 className="text-xl font-semibold mb-3 text-indigo-400">
              Search & Filters
            </h3>

            <p className="text-gray-400">
              Quickly find tasks with advanced filtering, searching and
              pagination.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#020617] py-24 px-8">
        <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center">
          <div>
            <div className="text-indigo-400 text-3xl font-bold mb-4">1</div>

            <h3 className="text-xl font-semibold mb-2">Create Account</h3>

            <p className="text-gray-400">
              Register securely and access your personal task workspace.
            </p>
          </div>

          <div>
            <div className="text-indigo-400 text-3xl font-bold mb-4">2</div>

            <h3 className="text-xl font-semibold mb-2">Manage Tasks</h3>

            <p className="text-gray-400">
              Add, update, delete and track all your daily tasks easily.
            </p>
          </div>

          <div>
            <div className="text-indigo-400 text-3xl font-bold mb-4">3</div>

            <h3 className="text-xl font-semibold mb-2">Stay Productive</h3>

            <p className="text-gray-400">
              Organize work efficiently and improve your productivity.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold">Start Organizing Your Work Today</h2>

        <p className="text-gray-400 mt-4">
          Your productivity starts with better task management.
        </p>

        <Link
          href="/signup"
          className="inline-block mt-8 bg-indigo-500 px-7 py-3 rounded-lg hover:bg-indigo-600 transition"
        >
          Create Free Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} TaskFlow. Built with Next.js & Tailwind.
      </footer>
    </main>
  );
}
