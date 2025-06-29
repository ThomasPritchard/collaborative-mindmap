# Agents.md: AI Onboarding Guide

This document provides OpenAI Codex with the necessary context to understand and contribute to the Real-time Collaborative Mind Mapping project.

---

## 1. Project Structure and Architecture

The project is a monorepo containing two primary packages: `frontend/` and `backend/`.

### Backend (`backend/`)

The backend is a high-performance, real-time server responsible for managing collaborative sessions.

* **Framework**: **Fastify** on Node.js.
* **Language**: **TypeScript**.
* **Core Technology**: **WebSockets** (`@fastify/websocket`) for all real-time communication. All client-server interaction after the initial HTTP upgrade occurs over a single, persistent WebSocket connection per client.
* **Architecture**: The application uses a plugin-based architecture, organized as follows:
    * **`src/plugins/`**: Registers global Fastify plugins. Key files include:
        * `websocket.ts`: Registers the WebSocket handler.
        * `services.ts`: Creates and decorates a singleton `services` container (`fastify.services`) holding all service instances.
    * **`src/services/`**: Contains singleton classes for business logic.
        * `StateManagerService.ts`: The core service that manages all rooms, users, and mind map data in-memory.
    * **`src/routes/`**: Defines API routes. The primary route is `/ws`, which handles the WebSocket upgrade request.
    * **`src/handlers/`**: Contains the logic for handling specific WebSocket messages. It uses a **Factory Pattern** and **Constructor Injection**.
        * `BaseHandler.ts`: An abstract base class for all handlers.
        * `handlerRegistry.ts`: Maps message `type` strings (e.g., `'CREATE_NODE'`) to a factory function that instantiates the correct handler with its required dependencies from the `services` container.
* **State Management**: All application state is non-persistent and managed in-memory by `StateManagerService`. The state object uses `Map` objects for efficient, O(1) lookups of rooms and users.

### Frontend (`frontend/`)

The frontend is a modern, interactive web application for users to view and edit the mind map.

* **Framework**: **Next.js** (React).
* **Language**: **TypeScript**.
* **Core Technology**: A canvas rendering library like **Konva.js** (via `react-konva`) is used to draw and manage the mind map shapes and text on an HTML5 canvas.
* **Communication**: The client establishes a WebSocket connection to the backend. It sends user actions as JSON messages and listens for state update messages from the server to re-render the UI.
* **State Management**: Local UI state is managed with React Hooks (`useState`, `useReducer`). The client-side state is a reflection of the state broadcasted by the server, which is treated as the single source of truth.

---

## 2. Coding Standards and Conventions

* **Language**: The entire codebase is **TypeScript**. Avoid using `any` unless absolutely necessary.
* **Formatting**: Code is formatted using **Prettier** with default settings.
* **Naming Conventions**:
    * **Files**: `camelCase.ts` or `PascalCase.tsx` for React components.
    * **Classes**: `PascalCase` (e.g., `StateManagerService`, `CreateNodeHandler`).
    * **Types/Interfaces**: `PascalCase` (e.g., `Room`, `MindMapNode`).
    * **Variables/Functions**: `camelCase`.
* **WebSocket Message Format**: All messages between client and server MUST be a JSON string representing an object with the following structure:
    ```json
    {
      "type": "ACTION_TYPE_IN_UPPER_SNAKE_CASE",
      "payload": { ... }
    }
    ```

---