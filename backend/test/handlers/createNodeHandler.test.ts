import { test } from 'node:test';
import * as assert from 'node:assert';
import { CreateNodeHandler } from '../../src/handlers/CreateNodeHandler.js';
import StateManagerService from '../../src/services/StateManagerService.js';
import { WebSocket } from 'ws';

class MockServer {
  clients: Set<MockSocket> = new Set();
}

class MockSocket {
  messages: string[] = [];
  readyState = WebSocket.OPEN;
  constructor(public server: MockServer, public roomId: string) {
    server.clients.add(this);
  }
  send(data: string) {
    this.messages.push(data);
  }
}

test('CreateNodeHandler stores node and broadcasts to room', () => {
  const stateManager = new StateManagerService();
  const handler = new CreateNodeHandler(stateManager);
  const server = new MockServer();
  const socketA = new MockSocket(server, 'room1');
  const socketB = new MockSocket(server, 'room1');

  // ensure room exists
  stateManager.joinRoom('room1', 'a', 'A');

  handler.handle(socketA as unknown as WebSocket, {
    roomId: 'room1',
    text: 'hello',
    position: { x: 0, y: 0 },
  } as any);

  const room = stateManager.getRoom('room1');
  assert.ok(room);
  assert.equal(room!.mindMap.nodes.size, 1);

  assert.equal(socketA.messages.length, 1);
  assert.equal(socketB.messages.length, 1);
  const msg = JSON.parse(socketA.messages[0]);
  assert.equal(msg.type, 'NODE_CREATED');
  assert.equal(msg.payload.text, 'hello');
});
