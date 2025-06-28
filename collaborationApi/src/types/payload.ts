import { UserJoinPayload } from "./userJoinPayload.js";

export type Payload = {
  type: string;
  payload: MessagePayload;
};

export type MessagePayload = UserJoinPayload;