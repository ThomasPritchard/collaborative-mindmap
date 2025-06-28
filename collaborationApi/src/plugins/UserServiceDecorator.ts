import fp from 'fastify-plugin';
import UserService from '../services/UserService.js';

const userService = new UserService();

export default fp(async (fastify) => {
  fastify.decorate('userService', userService);
});