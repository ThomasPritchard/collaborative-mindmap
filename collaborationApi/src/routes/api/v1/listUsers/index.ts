import { FastifyPluginAsync } from 'fastify';
import UserService from '../../../../services/UserService.js';

const listUsersRoute: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  const userService = fastify.getDecorator<UserService>('userService');

  fastify.get('/', async (request, _reply) => {
    const users = userService.listUsersInRoom((request.query as any).roomId);
    return { users };
  });
};

export default listUsersRoute;
