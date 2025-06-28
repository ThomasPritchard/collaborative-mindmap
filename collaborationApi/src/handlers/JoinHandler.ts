import { WebSocket } from 'ws'; // Explicitly import WebSocket from 'ws'
import { BaseHandler } from "./BaseHandler.js";
import { MessagePayload } from '../types/payload.js';
import UserService from '../services/UserService.js';
import { UserJoinPayload } from '../types/userJoinPayload.js';

export class JoinHandler extends BaseHandler {
  constructor(private userService: UserService) {
    super();
  }

  handle(socket: WebSocket, message: MessagePayload): void {
    const { userId, userName } = message as UserJoinPayload;

    if (!userId) {
      socket.send(JSON.stringify({ error: 'Room ID and User ID are required' }));
      return;
    }

    // Here you would typically add the user to the room in your application logic
    const assignedRoomId = this.userService.joinRoom(userId, userName);

    socket.send(JSON.stringify({ success: true, message: `User ${userId} joined room ${assignedRoomId}` }));
  }
}