import { State } from "../types/state.js";

class StateManagerService {
  private state: State = {
    rooms: [],
  };

  public joinRoom(roomId: string, userId: string, userName: string): void {
    const room = this.state.rooms.find((r) => r.roomId === roomId);
    if (room) {
      // Check if user already exists in the room
      if (!room.users.some((user) => user.userId === userId)) {
        room.users.push({ userId, userName, roomId });
      }
    } else {
      // Create a new room if it doesn't exist
      this.state.rooms.push({
        createdAt: new Date(),
        roomId,
        users: [{ userId, userName, roomId }],
      });
    }
  }

  public leaveRoom(roomId: string, userId: string): boolean {
    const room = this.state.rooms.find((r) => r.roomId === roomId);
    if (room) {
      const userIndex = room.users.findIndex((user) => user.userId === userId);
      if (userIndex !== -1) {
        room.users.splice(userIndex, 1);
        // If no users left, remove the room
        if (room.users.length === 0) {
          this.state.rooms = this.state.rooms.filter((r) => r.roomId !== roomId);
        }
        return true;
      }
    }
    return false;
  }

  public listUsersInRoom(roomId: string): Array<{ userId: string; userName: string }> {
    const room = this.state.rooms.find((r) => r.roomId === roomId);
    if (room) {
      return room.users.map((user) => ({
        userId: user.userId,
        userName: user.userName,
      }));
    }
    return [];
  }

  public clearState(): void {
    this.state = {
      rooms: [],
    };
  }
}

export default StateManagerService;