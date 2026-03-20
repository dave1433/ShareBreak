# Re:set

ShareBreak is a web app created during **Esbjerg Hackathon (March 2026)** for the **UNPLUG** challenge.

The core idea is simple: help people unplug from constant work/screen pressure and build healthier habits through small real-world social activities. By logging offline moments, tracking progress, and earning badges, the app aims to reduce burnout risk and encourage meaningful breaks.

## Why This Exists

Modern teams are always connected, but often socially disconnected. Re:set focuses on motivating people to:

- step away from work regularly,
- do short offline activities with others,
- build consistent wellbeing habits,
- make recovery and social connection visible and rewarding.

## Main Features

- **Authentication**: register and login with JWT-based auth.
- **Dashboard**: protected area for signed-in users.
- **Friends**: search users, send/accept/reject friend requests, manage connections.
- **Badges**: milestone-style feedback for progress and engagement.
- **Profile settings**: privacy, notifications, and language preferences.
- **Generated API client**: frontend client is generated from backend OpenAPI in development.

## Project Structure

```text
ShareBreak/
  client/   React + TypeScript + Vite + Tailwind
  server/   ASP.NET Core + EF Core + PostgreSQL + JWT
```

## Tech Stack

### Frontend (`client/`)

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS

### Backend (`server/`)

- ASP.NET Core (.NET 10)
- Entity Framework Core
- PostgreSQL (Npgsql)
- JWT auth
- NSwag/OpenAPI

## Environment Variables

The backend expects environment variables (loaded via `DotNetEnv`). At minimum:

- `DEV_DB_CONNECTION`
- `SECRET`
- `SUPER_USER_EMAIL`
- `SUPER_PASSWORD`

Optional but useful:

- `SUPER_USER_NAME`
- `SUPER_USER_BIRTHDAY`

Example `.env` (project root):

```env
DEV_DB_CONNECTION=Host=localhost;Port=5432;Database=sharebreak_dev;Username=postgres;Password=postgres
SECRET=replace-with-a-long-random-secret
SUPER_USER_EMAIL=admin@dev.com
SUPER_PASSWORD=adminpass
SUPER_USER_NAME=Admin
SUPER_USER_BIRTHDAY=2000-01-01
```

For frontend API target (optional), create `client/.env`:

```env
VITE_API_URL=http://localhost:5255
```

## Run Locally

### 1) Start backend

```bash
cd server
dotnet restore
dotnet run
```

Backend runs on `http://localhost:5255` (see launch settings). Swagger/OpenAPI is enabled.

### 2) Start frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on Vite default (`http://localhost:5173`). API calls to `/api` are proxied to `VITE_API_URL` (or `http://localhost:5255` by default).

## Hackathon Context

Built for the **UNPLUG** challenge, ShareBreak is centered on one outcome: make healthy, offline micro-breaks easier to start and sustain. Instead of more notifications and pressure, it nudges people toward intentional time away from work and stronger social wellbeing.

## Current Focus

- improving auth flow stability,
- improving registration/login UX,
- polishing dashboard/friends/badges experience,
- reducing friction for teams to adopt healthy unplug routines.

