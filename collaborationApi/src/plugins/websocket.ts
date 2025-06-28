import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import websocketPlugin from '@fastify/websocket'

/**
 * This plugin registers the @fastify/websocket functionality
 */
const websocket: FastifyPluginAsync = async (fastify) => {
  await fastify.register(websocketPlugin)
}

// The 'fastify-plugin' wrapper is important!
// It tells Fastify not to encapsulate this plugin, so the
// .websocket functionality is available to all your routes.
export default fp(websocket)