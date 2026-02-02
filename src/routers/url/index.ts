import type { FastifyPluginAsync } from 'fastify'

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
    async () => {
      return { shortUrl: 'https://x.y/abc' }
    }
  )
}
