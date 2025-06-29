import { FastifyPluginAsync } from "fastify";
import { messageHandlers } from "../../../../handlers/index.js";
import { Payload } from "../../../../types/payload.js";
import { BaseHandler } from "../../../../handlers/BaseHandler.js";

const websocketRoute: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  const handlerInstances = new Map<string, BaseHandler>();

  for (const [type, handlerFactory] of Object.entries(messageHandlers)) {
    // Call the factory, passing the service container to it
    handlerInstances.set(type, handlerFactory(fastify.services));
  }

  fastify.get('/', { websocket: true }, (socket, _req) => {
    socket.on('message', message => {
      // Parse the message to json.
      const parsedMessage: Payload = JSON.parse(message.toString());

      // In your main websocket route file
      const handler = handlerInstances.get(parsedMessage.type);

      if (handler) {
        handler.handle(socket, parsedMessage.payload);
      }
    });
  });
};

export default websocketRoute;
