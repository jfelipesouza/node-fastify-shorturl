import Fastify from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import {} from '@fastify/swagger-ui'
import { fastifyCors } from '@fastify/cors'
import ScalarApiReference from '@scalar/fastify-api-reference'
import { cors } from './cors'
import { swaggerConfig } from './swagger'
import { router } from '@/routers'

const server = Fastify({ logger: true })

server.register(fastifyCors, cors)
server.register(fastifySwagger, swaggerConfig)
server.register(ScalarApiReference, {
  routePrefix: '/docs'
})

server.register(router, {
  prefix: '/v1/'
})

export { server }
