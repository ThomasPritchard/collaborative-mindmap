# Mind Map Frontend

This directory contains the Next.js application responsible for rendering the collaborative mind map UI.

## Project Goals
- Provide an intuitive canvas-based editor for creating and connecting nodes.
- Synchronize all changes with the Fastify backend in real time.
- Serve as a foundation for future collaboration features.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` if you need to adjust environment variables.

## Running Locally
Start the development server:
```bash
npm run dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).
You can also start the entire stack with Docker Compose from the project root:
```bash
docker-compose up
```
