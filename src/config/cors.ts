import type { FastifyCorsOptions } from '@fastify/cors'

export const cors: FastifyCorsOptions = {
  origin: ['*'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
