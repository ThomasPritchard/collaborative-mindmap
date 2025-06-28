import fp from 'fastify-plugin';
import UserService from '../services/UserService.js';

export const services = {
  userService: new UserService(),
  // Add other services here
};

// This type can be used elsewhere in the app
export type ServiceContainer = typeof services;

export default fp(async (fastify) => {
  fastify.decorate('services', services);
});