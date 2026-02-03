import type { FastifyPluginAsync } from 'fastify'
import { UrlController } from './controller/UrlController'

const controller = new UrlController()

export const urlRoutes: FastifyPluginAsync = async app => {
  // Create Temporary Short URL
  app.post(
    '/temp/create',
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
  // Get all URLs (for testing purposes)
  app.get(
    '/all',
    {
      schema: {
        tags: ['URL'],
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                original: { type: 'string' },
                short: { type: 'string' },
                isTemp: { type: 'boolean' },
                expireAt: { type: ['string', 'null'], format: 'date-time' },
                createdAt: { type: 'string', format: 'date-time' }
              }
            }
          }
        }
      }
    },
    async (request, reply) => {
      const urls = await controller.getAllUrls()
      return reply.status(200).send(urls)
    }
  )
}
