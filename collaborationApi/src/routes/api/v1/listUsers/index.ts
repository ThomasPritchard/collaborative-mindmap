import { FastifyPluginAsync } from 'fastify';

const listUsersRoute: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get('/', async (request, _reply) => {
    const users = fastify.services.userService.listUsersInRoom((request.query as any).roomId);
    return { users };
  });
};

export default listUsersRoute;
