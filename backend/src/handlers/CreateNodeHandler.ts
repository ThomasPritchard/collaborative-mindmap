import { WebSocket } from "ws";
import crypto from "node:crypto";
import { BaseHandler } from "./BaseHandler.js";
import StateManagerService from "../services/StateManagerService.js";
import { MessagePayload } from "../types/payload.js";
import { CreateNodePayload } from "../types/createNodePayload.js";
import { MindMapNode } from "../types/state.js";

export class CreateNodeHandler extends BaseHandler {
  constructor(private stateManager: StateManagerService) {
    super();
  }

  handle(socket: WebSocket, message: MessagePayload): void {
    const { roomId, text, position, color } = message as CreateNodePayload;

    if (!roomId || !text || !position) {
      socket.send(
        JSON.stringify({ error: "roomId, text and position are required" }),
      );
      return;
    }

    const newNode: MindMapNode = {
      id: crypto.randomUUID(),
      text,
      position,
      ...(color ? { color } : {}),
    };

    this.stateManager.setNode(roomId, newNode);

    const payload = JSON.stringify({ type: "NODE_CREATED", payload: newNode });

    const server = (socket as any).server;
    server.clients.forEach((client: WebSocket) => {
      const clientRoomId = (client as any).roomId;
      if (client.readyState === WebSocket.OPEN && clientRoomId === roomId) {
        client.send(payload);
      }
    });
  }
}
