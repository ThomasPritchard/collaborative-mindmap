export type State = {
  rooms: Room[];
}

export type Room = {
  createdAt: Date;
  roomId: string;
  users: User[];
}

export type User = {
  userId: string;
  userName: string;
  roomId: string;
}