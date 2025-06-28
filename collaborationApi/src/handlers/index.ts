import { HandlerClass } from "./BaseHandler.js";
import { JoinHandler } from "./JoinHandler.js";

export const messageHandlers: Record<string, HandlerClass> = {
  'USER_JOIN': JoinHandler,
};