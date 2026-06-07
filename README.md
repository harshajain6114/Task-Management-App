# ClarityOS - Task Management App

A full-stack MERN task management app with JWT auth, filters, pagination, and a clean dashboard UI.

## Stack
- **Frontend:** React 18, Vite, React Router v6, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT

## Setup

### Backend
```bash
cd clarityos/backend
npm install
# Create .env from .env.example and fill in MONGO_URI and JWT_SECRET
npm run dev
```

### Frontend
```bash
cd clarityos/frontend
npm install
# Create .env from .env.example — set VITE_API_URL=http://localhost:5000/api
npm run dev
```

## Features
- Register / Login with JWT auth
- Create, edit, delete tasks
- Toggle task status (pending → in-progress → completed)
- Filter by status & priority, search by title
- Pagination
- Responsive dashboard with stat cards

## Live URLs (dev)
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
