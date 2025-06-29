import { WebSocket } from 'ws'; // Explicitly import WebSocket from 'ws'
import { BaseHandler } from "./BaseHandler.js";
import { MessagePayload } from '../types/payload.js';
import { UserJoinPayload } from '../types/userJoinPayload.js';
import StateManagerService from '../services/StateManagerService.js';

export class JoinHandler extends BaseHandler {
  constructor(private stateManager: StateManagerService) {
    super();
  }

  handle(socket: WebSocket, message: MessagePayload): void {
    const { roomId, userId, userName } = message as UserJoinPayload;

    if (!userId || !roomId) {
      socket.send(JSON.stringify({ error: 'Room ID and User ID are required' }));
      return;
    }

    // Here you would typically add the user to the room in your application logic
    const assignedRoomId = this.stateManager.joinRoom(roomId, userId, userName);

    socket.send(JSON.stringify({ success: true, message: `User ${userId} joined room ${assignedRoomId}` }));
  }
}