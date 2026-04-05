# 🚀 TaskFlow: Full-Stack Monorepo Task Manager

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Live Demo:** [https://task-management-web-bice.vercel.app]  
**Username:** [testdemo@email.com]
**password:** [1234567890]

## 📖 Overview
TaskFlow is a production-ready, full-stack task management application built to demonstrate modern web development practices. It features a completely separated Next.js frontend and Express backend, united in a **Turborepo monorepo** to share database schemas and types. 

The application implements a stateless JWT authentication system with automatic silent token refreshing, optimistic UI updates for instant feedback, and a fully responsive dark-mode interface.

## ✨ Key Features

* **Advanced Authentication:** Stateless JWT implementation with short-lived Access Tokens and long-lived Refresh Tokens. Features Axios interceptors for automatic, silent token renewal on 401 errors.
* **Optimistic UI:** Instant frontend state updates for task creation, deletion, and status toggling before the server responds, ensuring a snappy user experience.
* **Monorepo Architecture:** Utilizes Turborepo to strictly separate concerns (`apps/web`, `apps/backend`) while sharing core business logic and the database schema (`packages/db`).
* **Relational Database:** PostgreSQL managed via Prisma ORM, featuring a 1-to-Many relational schema between Users and Tasks.
* **Secure API:** Express REST API heavily protected by Zod payload validation, Bcrypt password hashing, and custom authentication middleware.
* **Dynamic Filtering:** Instant, derived-state frontend filtering via URL Search Parameters without requiring additional database queries.

## 🏗️ Architecture & Monorepo Structure

This project uses `pnpm` workspaces and Turborepo for fast, cached builds.

```text
task-management/
├── apps/
│   ├── web/               # Next.js frontend application (React, Tailwind, Axios)
│   └── backend/           # Express REST API (Node.js, Zod, JWT)
├── packages/
│   ├── db/                # Shared Prisma ORM, schema, and generated client
│   ├── typescript-config/ # Shared tsconfig.json
│   ├── comman/            # Shared schema validations
│   └── eslint-config/     # Shared linting rules


## 💻 Tech Stack

* **Frontend:** Next.js (React), Tailwind CSS, Axios
* **Backend:** Node.js, Express.js, Zod (Validation), JSON Web Tokens (JWT), Bcrypt
* **Database:** PostgreSQL (Supabase / Neon), Prisma ORM
* **DevOps/Deployment:** Vercel (Frontend), Render (Backend), Turborepo

---

## 🚀 Getting Started (Local Development)

### Prerequisites
* Node.js (v18+)
* `pnpm` installed (`npm install -g pnpm`)
* A local PostgreSQL database (or Docker)

### 1. Clone the repository
```bash
git clone [https://github.com/yourusername/TaskManagement.git](https://github.com/yourusername/TaskManagement.git)
cd TaskManagement

### 2. Install Dependencies
```bash
pnpm install

### 3. Environment Setup
Create a `.env` file in the root of the project (or inside `packages/db` and `apps/backend` respectively) and add the following:

```env
# Database
DATABASE_URL="PostgreSQL://postgres:mysecretpassword@localhost:5432/postgres" # Run database in docker
DIRECT_URL="postgresql://postgres:password@localhost:5432/mydb" # Required if using Supabase

# Backend Auth Secrets
JWT_ACCESS_SECRET="your_super_secret_access_key"
JWT_REFRESH_SECRET="your_super_secret_refresh_key"

# Frontend Configuration
NEXT_PUBLIC_HTTP_BACKEND="http://localhost:8080"

### 4. Database Initialization
Push the Prisma schema to your local database and generate the client:

```bash
pnpm --filter @repo/db run push
pnpm --filter @repo/db run generate

### 5. Start the Application
Run the entire monorepo concurrently using Turborepo:

```bash
pnpm run dev
The frontend will be available at: http://localhost:3000

The backend will be available at: http://localhost:8080

## ☁️ Deployment Strategy
This monorepo uses a split deployment strategy to optimize hosting environments.

### 1. Database (Supabase / Neon)
We use a Transaction (Pooled) Connection (port 6543) for the Express app to handle high traffic efficiently.

We use a Session (Direct) Connection (port 5432) mapped to the DIRECT_URL environment variable specifically for Prisma schema pushes (pnpm prisma db push).

### 2. Backend API (Render)
Deployed as a Node Web Service on Render.

* **Build Command**: pnpm install && pnpm --filter @repo/db run generate && pnpm run build --filter backend
* **Start Command**: cd apps/backend && pnpm run start
* **CORS Configuration**: Configured to accept requests strictly from the deployed Vercel frontend URL.

### 3. Frontend Web App (Vercel)
* Deployed on Vercel for edge-optimized static and server-rendered delivery.
* Vercel automatically detects the Turborepo workspace.
* NEXT_PUBLIC_HTTP_BACKEND is configured to point to the live Render URL.
* Client components interacting with URL search parameters (like filters) are wrapped in <Suspense> boundaries to prevent static prerendering build errors.

## 🔮 Future Improvements
* Add React Query (@tanstack/react-query) for advanced server-state caching.
* Implement a Next.js Edge Middleware for route protection before rendering.
* Add drag-and-drop task reordering functionality.
