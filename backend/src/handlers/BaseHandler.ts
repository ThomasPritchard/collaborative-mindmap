import { WebSocket } from 'ws'; // Explicitly import WebSocket from 'ws'
import { MessagePayload } from '../types/payload.js';

export abstract class BaseHandler {
  constructor() {} 

  abstract handle(socket: WebSocket, message: MessagePayload): void;
};

export type HandlerClass = new () => BaseHandler;
