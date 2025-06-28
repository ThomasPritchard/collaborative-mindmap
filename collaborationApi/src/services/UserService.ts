class UserService {
  private users: Map<string, { userId: string; userName: string, roomId: string }>;
  
  constructor() {
    this.users = new Map();
  };

  // Method to handle user joining a room
  public joinRoom(userId: string, userName: string): string {
    // Logic to add the user to a new room
    const roomId = 'defaultRoom'; // TODO This should be replaced with actual room logic

    console.log(`User ${userName} with ID ${userId} joined room ${roomId}`);

    this.users.set(userId, { userId, userName, roomId });

    return roomId;
  }

  public leaveRoom(userId: string): boolean {
    if (this.users.has(userId)) {
      const user = this.users.get(userId)!
      console.log(`User ${user.userName} with ID ${userId} left room ${user.roomId}`)
      this.users.delete(userId)
      return true
    }
    return false
  }

  public listUsersInRoom(roomId: string): Array<{ userId: string; userName: string }> {
    // Logic to list users in a specific room
    const usersInRoom: Array<{ userId: string; userName: string }> = [];

    this.users.forEach((user) => {
      console.log(`Checking user ${user.userName} in room ${user.roomId}`);
      if (user.roomId === roomId) {
        usersInRoom.push({ userId: user.userId, userName: user.userName });
      }
    });

    return usersInRoom;
  }
};

export default UserService;
