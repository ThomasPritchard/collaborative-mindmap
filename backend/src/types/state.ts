// The state for one specific node on the canvas
export type MindMapNode = {
  id: string;
  text: string;
  position: { x: number; y: number };
  color?: string;
};

// A user connected to a room
export type User = {
  userId: string;
  userName: string;
};

// The state for a single collaborative room
export type Room = {
  createdAt: Date;
  roomId: string;
  users: Map<string, User>; // Faster lookup by userId
  mindMap: {
    nodes: Map<string, MindMapNode>; // Faster lookup by nodeId
  };
};

// The top-level state for the entire server
export type State = {
  rooms: Map<string, Room>; // Faster lookup by roomId
};