import { ServiceContainer } from '../plugins/services.ts';

// This tells TypeScript to add our custom property to the Fastify interface
declare module 'fastify' {
  export interface FastifyInstance {
    services: ServiceContainer;
  }
}