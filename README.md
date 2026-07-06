[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Enabled-blue)](https://hub.docker.com/)
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

Before running any configuration, set up the root deployment environment:

```bash
cp deployment/.env.example deployment/.env
```

If you plan to run the `api` or `web` services locally (outside of Docker), you should also set up their respective environments:

```bash
cp api/.env.example api/.env
cp web/.env.example web/.env.local
```

> **Note on `OPENINARY_API_KEY`**: 
> The application uses Openinary for image hosting. When running locally or in development, you can generate an API key by visiting the Openinary dashboard at `http://localhost:3002` after the service has started. 
> For production deployments, it is **critical** to set a valid `OPENINARY_API_KEY` in your `deployment/.env` file to secure image uploads. If left blank, the system may allow unauthenticated access to the media service depending on its configuration, which is insecure for production.

#### Deployment Options

| Mode | Command | Description |
| --- | --- | --- |
| **Full Stack** | `docker compose -f deployment/full.yml up --build` | Runs everything: API, Web, Auth, and Databases. |
| **Frontend Dev** | `docker compose -f deployment/frontend.yml up --build` | Runs API, Auth, and Databases. Ideal for frontend developers running the web app locally. |
| **Backend Dev** | `docker compose -f deployment/backend.yml up --build` | Runs Auth and Databases. Ideal for backend developers running the API and web app locally. |
| **Production** | `docker compose -f deployment/production.yml up` | Runs everything using pre-built images from GHCR. No local build required. |

Once the containers are running:
- **Frontend:** [http://localhost:3000](http://localhost:3000) (if running in Full Stack mode)
- **Backend API:** [http://localhost:3001](http://localhost:3001)
- **API Documentation:** [http://localhost:3001/api](http://localhost:3001/api)
- **Hanko Auth:** [http://localhost:8000](http://localhost:8000)
- **MailSlurper (Email Mock):** [http://localhost:8080](http://localhost:8080)
- **Openinary (Image Service):** [http://localhost:3002](http://localhost:3002)

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

The backend application will be running on `http://localhost:3000` (or as configured in `.env`).

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

The backend API is documented using Swagger. Once the backend application is running, you can access the API documentation at `http://localhost:3001/api` (if running via Docker) or `http://localhost:3000/api` (if running locally without a custom `PORT`).

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
