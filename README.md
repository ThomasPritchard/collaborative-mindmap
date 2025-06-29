# Real-time Collaborative Mind Mapping Tool

This project is a full-stack application that allows multiple users to collaboratively create and edit mind maps in real-time. It's built with a modern TypeScript-first technology stack, featuring a Next.js frontend and a Fastify backend.

The application is divided into two main components:

1.  **`frontend/`**: The client-side Next.js application that users interact with.
2.  **`backend/`**: The server-side Fastify API that powers the real-time collaboration.

---
##  Frontend (`frontend/`)

The frontend is a **Next.js** application responsible for rendering the mind map canvas and handling all user interactions.

* **Technology**: Built with Next.js and React, using TypeScript for type safety.
* **Rendering**: It will use a canvas library (like **Konva.js** or **React Flow**) to draw and manipulate the mind map's nodes and connections.
* **Communication**: It establishes a persistent WebSocket connection to the backend server to send user actions (e.g., creating a node) and receive real-time updates from other users.

---
## Backend (`backend/`)

The backend is a high-performance **Fastify** server that acts as the central hub for all real-time communication.

* **Technology**: Built with Fastify and Node.js, using TypeScript.
* **Real-time Engine**: It uses **WebSockets** to manage client connections and broadcast messages. When one user makes a change, the backend receives the action, updates the state, and relays the change to all other clients in the same session.
* **State Management**: It manages the state of each collaborative session (or "room") in memory, including the list of connected users and the current structure of the mind map for that room.