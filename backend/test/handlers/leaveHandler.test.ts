import { test } from 'node:test';
import * as assert from 'node:assert';
import { LeaveHandler } from '../../src/handlers/LeaveHandler.js';
import StateManagerService from '../../src/services/StateManagerService.js';
import { WebSocket } from 'ws';

class MockSocket {
  messages: string[] = [];
  readyState = WebSocket.OPEN;
  send(data: string) {
    this.messages.push(data);
  }
}

test('LeaveHandler removes user and cleans up empty room', () => {
  const stateManager = new StateManagerService();
  stateManager.joinRoom('room1', 'user1', 'Alice');

  const handler = new LeaveHandler(stateManager);
  const socket = new MockSocket();

  handler.handle(socket as unknown as WebSocket, {
    roomId: 'room1',
    userId: 'user1',
  } as any);

  const room = stateManager.getRoom('room1');
  assert.equal(room, undefined);

  assert.equal(socket.messages.length, 1);
  const msg = JSON.parse(socket.messages[0]);
  assert.deepStrictEqual(msg, {});
});

test('LeaveHandler returns error on missing params', () => {
  const stateManager = new StateManagerService();
  stateManager.joinRoom('room1', 'user1', 'Alice');

  const handler = new LeaveHandler(stateManager);
  const socket = new MockSocket();

  handler.handle(socket as unknown as WebSocket, {
    roomId: '',
    userId: 'user1',
  } as any);

  assert.equal(socket.messages.length, 1);
  const msg = JSON.parse(socket.messages[0]);
  assert.equal(msg.error, 'User ID and Room ID are required');

  const room = stateManager.getRoom('room1');
  assert.ok(room);
  assert.ok(room!.users.has('user1'));
});
