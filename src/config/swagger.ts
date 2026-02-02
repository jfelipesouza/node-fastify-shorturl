import { SwaggerOptions } from '@fastify/swagger'

export const swaggerConfig: SwaggerOptions = {
  openapi: {
    info: {
      title: 'URL Shortener API',
      description: 'API for shortening URLs',
      version: '1.0.0',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      },
      contact: {
        name: 'Api support',
        url: 'https://www.linkedin.com/in/souzajfo/'
      }
    }
  }
}
