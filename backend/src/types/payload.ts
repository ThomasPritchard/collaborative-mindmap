import { UserJoinPayload } from "./userJoinPayload.js";
import { UserLeftPayload } from "./userLeftPayload.js";
import { CreateNodePayload } from "./createNodePayload.js";

export type Payload = {
  type: string;
  payload: MessagePayload;
};

export type MessagePayload =
  | UserJoinPayload
  | UserLeftPayload
  | CreateNodePayload;
