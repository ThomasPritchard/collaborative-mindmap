import { WebSocket } from 'ws'; // Explicitly import WebSocket from 'ws'
import { MessagePayload } from '../types/payload.js';
import UserService from '../services/UserService.js';

export abstract class BaseHandler {
  constructor(protected userService: UserService) {} 

  abstract handle(socket: WebSocket, message: MessagePayload): void;
};

export type HandlerClass = new (userService: UserService) => BaseHandler;
