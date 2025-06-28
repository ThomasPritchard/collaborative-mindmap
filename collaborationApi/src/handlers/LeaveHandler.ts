import { WebSocket } from 'ws';
import { BaseHandler } from './BaseHandler.js';
import { MessagePayload } from '../types/payload.js';
import UserService from '../services/UserService.js';
import { UserLeftPayload } from '../types/userLeftPayload.js';

export class LeaveHandler extends BaseHandler {
  constructor(private userService: UserService) {
    super();
  }

  handle(socket: WebSocket, message: MessagePayload): void {
    const { userId } = message as UserLeftPayload;

    if (!userId) {
      socket.send(JSON.stringify({ error: 'User ID is required' }));
      return;
    }

    const success = this.userService.leaveRoom(userId);
    socket.send(JSON.stringify({ success }));
  }
}
