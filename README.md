# MEST BDT Project

## A project to help organizations manage their companies in cohorts and programs

This project is a full-stack application designed to assist organizations in managing their companies through a structured system of cohorts and programs. It provides a comprehensive solution for tracking, organizing, and overseeing the progress of companies within various developmental stages.

The application is built with a modern technology stack, featuring a robust backend API and a user-friendly web interface. It is designed to be scalable, maintainable, and efficient, making it suitable for a wide range of organizational needs.

## Tech Stack

- **Backend:** [NestJS](https://nestjs.com) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- **Frontend:** [Next.js](https://nextjs.org) - A React framework for building user interfaces.
- **Language:** [TypeScript](https://www.typescriptlang.org) - A typed superset of JavaScript that compiles to plain JavaScript.

## Monorepo Structure

This project is organized as a monorepo, containing both the backend and frontend applications in a single repository. This approach simplifies dependency management and streamlines the development workflow.

- **`/api`**: This directory contains the NestJS backend application. It is responsible for handling business logic, data persistence, and serving the API.
- **`/web`**: This directory contains the Next.js frontend application. It provides the user interface for interacting with the application.

## Getting Started

To get started with this project, you can run the entire stack using Docker Compose or set up each component manually.

### Running with Docker (Recommended)

The project provides multiple Docker Compose configurations for different development needs.

#### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

#### Setup Environment Variables

Before running any configuration, set up the authentication environment:

```bash
cp hanko/.env.example hanko/.env
```

#### Deployment Options

| Mode | Command | Description |
| --- | --- | --- |
| **Full Stack** | `docker compose up --build` | Runs everything: API, Web, Auth, and Databases. |
| **Frontend Dev** | `docker compose -f deployment/frontend-dev.yml up --build` | Runs API, Auth, and Databases. Ideal for frontend developers running the web app locally. |
| **Backend Dev** | `docker compose -f deployment/backend-dev.yml up --build` | Runs Auth and Databases. Ideal for backend developers running the API and web app locally. |

Once the containers are running:
- **Frontend:** [http://localhost:3000](http://localhost:3000) (if running in Full Stack mode)
- **Backend API:** [http://localhost:4000](http://localhost:4000)
- **API Documentation:** [http://localhost:4000/api](http://localhost:4000/api)
- **Hanko Auth:** [http://localhost:8000](http://localhost:8000)
- **MailSlurper (Email Mock):** [http://localhost:8080](http://localhost:8080)

### Manual Setup

#### Prerequisites

- [Node.js](https://nodejs.org) (v18 or later)
- [npm](https://www.npmjs.com) (v9 or later)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Hanko Auth Service](https://github.com/teamhanko/hanko)

#### Backend (`/api`)

1. **Navigate to the `api` directory:**
   ```bash
   cd api
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Run the application in development mode:**
   ```bash
   npm run start:dev
   ```

The backend application will be running on `http://localhost:4000` (or as configured in `.env`).

#### Frontend (`/web`)

1. **Navigate to the `web` directory:**
   ```bash
   cd web
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Run the application in development mode:**
   ```bash
   npm run dev
   ```

The frontend application will be running on `http://localhost:3000`.

## API Documentation

The backend API is documented using Swagger. Once the backend application is running, you can access the API documentation at `http://localhost:4000/api`.

## Testing

### Backend (`/api`)

To run the tests for the backend application, navigate to the `/api` directory and run the following command:

```bash
npm test
```

This will run the unit and integration tests for the backend application.

### Frontend (`/web`)

There are currently no tests configured for the frontend application.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
