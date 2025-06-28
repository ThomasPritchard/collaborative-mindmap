import { WebSocket } from 'ws';
import { BaseHandler } from './BaseHandler.js';
import { MessagePayload } from '../types/payload.js';
import { UserLeftPayload } from '../types/userLeftPayload.js';
import StateManagerService from '../services/StateManagerService.js';

export class LeaveHandler extends BaseHandler {
  constructor(private stateManager: StateManagerService) {
    super();
  }

  handle(socket: WebSocket, message: MessagePayload): void {
    const { userId, roomId } = message as UserLeftPayload;

    if (!userId || !roomId) {
      socket.send(JSON.stringify({ error: 'User ID and Room ID are required' }));
      return;
    }

    const success = this.stateManager.leaveRoom(roomId, userId);
    socket.send(JSON.stringify({ success }));
  }
}
