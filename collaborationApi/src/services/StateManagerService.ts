import { State, Room, User, MindMapNode } from "../types/state.js"; // Make sure path is correct

class StateManagerService {
  private state: State = {
    rooms: new Map<string, Room>(),
  };

  /**
   * Gets a room by its ID.
   */
  public getRoom(roomId: string): Room | undefined {
    return this.state.rooms.get(roomId);
  }

  /**
   * Adds a user to a room. If the room doesn't exist, it's created first.
   */
  public joinRoom(roomId: string, userId: string, userName: string): Room {
    // Get the room or create it if it doesn't exist.
    let room = this.state.rooms.get(roomId);

    if (!room) {
      room = {
        createdAt: new Date(),
        roomId,
        users: new Map<string, User>(),
        mindMap: {
          nodes: new Map<string, MindMapNode>(),
        },
      };
      this.state.rooms.set(roomId, room);
    }

    // Add or update the user in the room's user map.
    const user: User = { userId, userName };
    room.users.set(userId, user);
    
    return room;
  }

  /**
   * Removes a user from a room and cleans up the room if it becomes empty.
   */
  public leaveRoom(roomId: string, userId: string): void {
    const room = this.state.rooms.get(roomId);

    if (room) {
      room.users.delete(userId);

      // If the room is now empty, remove it from the state.
      if (room.users.size === 0) {
        this.state.rooms.delete(roomId);
      }
    }
  }

  /**
   * Adds or updates a node in a specific room's mind map.
   */
  public setNode(roomId: string, node: MindMapNode): void {
    const room = this.state.rooms.get(roomId);
    if (room) {
      room.mindMap.nodes.set(node.id, node);
    }
  }

  /**
   * Deletes a node from a specific room's mind map.
   */
  public deleteNode(roomId: string, nodeId: string): void {
    const room = this.state.rooms.get(roomId);
    if (room) {
      room.mindMap.nodes.delete(nodeId);
    }
  }

  public listUsersInRoom(roomId: string): User[] {
    // Get the room directly by its ID.
    const room = this.state.rooms.get(roomId);

    if (room) {
      // room.users is a Map. Get its values and convert the iterator to an array.
      return Array.from(room.users.values());
    }
    
    // If the room doesn't exist, return an empty array.
    return [];
  }

  /**
   * Clears all rooms and resets the state.
   */
  public clearState(): void {
    this.state.rooms.clear();
  }
}

export default StateManagerService;