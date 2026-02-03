import type { FastifyPluginAsync } from 'fastify'

import { urlRoutes } from './url'

export const router: FastifyPluginAsync = async app => {
  await app.register(urlRoutes, { prefix: '/url' })

  // Get Original URL by Short URL
  app.get('/:short', async (request, reply) => {
    console.log('Redirecting short URL...')
    const params = request.params as { short: string }

    const response = await app.inject({
      method: 'GET',
      url: `/url/${params.short}`
    })
    if (response.statusCode === 200) {
      const data = await response.json()
      return reply.redirect(data.originalUrl)
    }
  })
}
