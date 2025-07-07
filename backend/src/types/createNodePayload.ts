export type CreateNodePayload = {
  roomId: string;
  text: string;
  position: { x: number; y: number };
  color?: string;
};
