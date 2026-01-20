# Task List App - Frontend

A minimal React frontend for a Task List application with JWT authentication.

## Features

- **User Registration** - Create a new account with email and password
- **User Login** - Authenticate and receive JWT token
- **Dashboard** - View and create tasks (protected route)

## Tech Stack

- React 18
- React Router v6
- Axios for API calls
- Tailwind CSS for styling
- Vite for development/build

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API server running (see API documentation below)

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your backend URL
# VITE_API_BASE_URL=http://localhost:3000

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── App.jsx           # Main app with routing
├── main.jsx          # Entry point
├── index.css         # Global styles (Tailwind)
├── pages/
│   ├── Login.jsx     # Login page
│   ├── Register.jsx  # Registration page
│   └── Dashboard.jsx # Task list dashboard
├── services/
│   └── api.js        # API client with auth interceptor
└── utils/
    └── auth.js       # Auth token management
```

## API Endpoints

The frontend integrates with the following API endpoints:

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user profile (protected)

### Tasks

- `GET /api/tasks` - Get all user tasks (protected)
- `POST /api/tasks` - Create new task (protected)
- `GET /api/tasks/{id}` - Get task by ID (protected)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:3000` |

## Assumptions

1. Backend returns JWT token in the response body on successful login
2. All protected routes require `Authorization: Bearer <token>` header
3. Task status defaults to "todo" when created
4. Update and delete operations are out of scope
.