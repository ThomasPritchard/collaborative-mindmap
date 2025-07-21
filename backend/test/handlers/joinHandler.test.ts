import { test } from 'node:test';
import * as assert from 'node:assert';
import { JoinHandler } from '../../src/handlers/JoinHandler.js';
import StateManagerService from '../../src/services/StateManagerService.js';
import { WebSocket } from 'ws';

class MockSocket {
  messages: string[] = [];
  readyState = WebSocket.OPEN;
  roomId?: string;
  userId?: string;
  send(data: string) {
    this.messages.push(data);
  }
}

test('JoinHandler adds user to room and responds with success', () => {
  const stateManager = new StateManagerService();
  const handler = new JoinHandler(stateManager);
  const socket = new MockSocket();

  handler.handle(socket as unknown as WebSocket, {
    roomId: 'room1',
    userId: 'user1',
    userName: 'Alice',
  } as any);

  const room = stateManager.getRoom('room1');
  assert.ok(room);
  assert.ok(room!.users.has('user1'));
  assert.equal((socket as any).roomId, 'room1');
  assert.equal((socket as any).userId, 'user1');

  assert.equal(socket.messages.length, 1);
  const msg = JSON.parse(socket.messages[0]);
  assert.equal(msg.success, true);
});

test('JoinHandler returns error on missing params', () => {
  const stateManager = new StateManagerService();
  const handler = new JoinHandler(stateManager);
  const socket = new MockSocket();

  handler.handle(socket as unknown as WebSocket, {
    roomId: '',
    userId: '',
    userName: '',
  } as any);

  assert.equal(socket.messages.length, 1);
  const msg = JSON.parse(socket.messages[0]);
  assert.equal(msg.error, 'Room ID and User ID are required');
  assert.equal(stateManager.getRoom(''), undefined);
});
