# 🚀 TaskFlow: Full-Stack Monorepo Task Manager

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Live Demo:** [Insert your Vercel URL here]  
**Backend API:** [Insert your Render URL here]  

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
