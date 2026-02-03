import type { FastifyPluginAsync } from 'fastify'
import { UrlController } from './controller/UrlController'

const controller = new UrlController()

export const urlRoutes: FastifyPluginAsync = async app => {
  app.post(
    '/',
    {
      schema: {
        tags: ['URL'],
        body: {
          type: 'object',
          required: ['url'],
          properties: {
            url: { type: 'string', format: 'uri' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              shortUrl: { type: 'string' }
            }
          }
        },
        security: [{ bearerAuth: [] }]
      }
    },
    async (request, reply) => {
      const data = request.body as { url: string }
      const result = await controller.createTempShortUrl(data)
      return reply.status(200).send(result)
    }
  )
}
