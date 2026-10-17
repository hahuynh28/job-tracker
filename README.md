# Job Tracker

A full-stack web application for managing job applications, tracking application statuses, and organizing the job search process.

## Features

- **Authentication:** User registration and login using JWT and bcrypt.
- **Protected Routes:** Authentication middleware protects backend resources.
- **Application Management:** Create, view, update, and delete job application records.
- **Filtering and Pagination:** Filter applications by status and navigate through paginated results.
- **Database Integration:** Store and manage application data in PostgreSQL using Prisma.
- **Layered Backend Structure:** Organize backend logic using a service layer.
- **Full-Stack Deployment:** Deployed frontend and backend with a hosted PostgreSQL database.

## Tech Stack

**Frontend**
- React
- shadcn/ui

**Backend**
- Node.js
- Express.js
- REST APIs
- JWT authentication
- bcrypt

**Database and ORM**
- PostgreSQL
- Prisma

**Deployment**
- Vercel
- Render
- Supabase

## Architecture

The application follows a client-server architecture:

1. The React frontend provides the user interface.
2. The frontend sends HTTP requests to the Express backend.
3. The backend handles authentication, request processing, and application business logic.
4. Prisma provides database access to PostgreSQL.
5. Protected endpoints require valid authentication.
