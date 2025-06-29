import { ServiceContainer } from "../plugins/services.js";
import { BaseHandler } from "./BaseHandler.js";
import { JoinHandler } from "./JoinHandler.js";
import { LeaveHandler } from "./LeaveHandler.js";

export const messageHandlers: Record<string, (services: ServiceContainer) => BaseHandler> = {
  'USER_JOIN': (services: ServiceContainer) => new JoinHandler(services.stateManagerService),
  'USER_LEFT': (services: ServiceContainer) => new LeaveHandler(services.stateManagerService),
};