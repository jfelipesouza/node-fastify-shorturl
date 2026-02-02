import type { FastifyPluginAsync } from 'fastify'

import { urlRoutes } from './url'

export const router: FastifyPluginAsync = async app => {
  await app.register(urlRoutes, { prefix: '/url' })
}
