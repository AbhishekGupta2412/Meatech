# Meatech - Full Stack Task Management Application

Meatech is a modern, secure, and full-stack task management application designed to help users organize their daily activities. It features secure authentication, real-time task updates, and a responsive UI.

**Live Demo:**

- **Frontend:** https://meatech.netlify.app
- **Backend API:** https://meatech-api.onrender.com

## 🚀 Features

- **User Authentication:** Secure registration and login using JWT (JSON Web Tokens).
- **Task Management:** Create, Read, Update, and Delete (CRUD) tasks.
- **State Management:** Centralized state using Redux Toolkit.
- **Responsive Design:** Built with Tailwind CSS for mobile and desktop compatibility.
- **Protected Routes:** Only authenticated users can access the dashboard.
- **Type Safety:** Full TypeScript implementation on both Frontend and Backend.

## 🛠️ Technology Stack

**Frontend:**

- React (Vite)
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Hook Form + Zod (Validation)
- Vitest + React Testing Library

**Backend:**

- Node.js & Express
- TypeScript
- PostgreSQL (Database)
- Prisma ORM
- JWT Authentication
- Jest + Supertest

## ⚙️ Local Setup Instructions

Follow these steps to run the project locally on your machine.

### Prerequisites

- Node.js (v16+)
- PostgreSQL installed and running locally

### 1. Clone the Repository

````bash
git clone https://github.com/AbhishekGupta2412/Meatech
cd Meatech

### 2. Backend Setup
```bash
cd backend
npm install

# Create a .env file in the backend folder
# Add: DATABASE_URL="postgresql://user:password@localhost:5432/meatech_db?schema=public"
# Add: JWT_SECRET="your_super_secret_key"

# Run Database Migrations
npx prisma migrate dev --name init

# Start Server
npm run dev

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start Frontend
npm run dev

### Running Tests

Frontend tests:
```bash
cd frontend
npm test

Backend tests:
```bash
cd backend
npx jest
````
