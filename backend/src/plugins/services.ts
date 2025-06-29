import fp from 'fastify-plugin';
import StateManagerService from '../services/StateManagerService.js';

export const services = {
  stateManagerService: new StateManagerService(),
  // Add other services here
};

// This type can be used elsewhere in the app
export type ServiceContainer = typeof services;

export default fp(async (fastify) => {
  fastify.decorate('services', services);
});