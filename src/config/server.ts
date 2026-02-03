import Fastify from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import { fastifyCors } from '@fastify/cors'
import ScalarApiReference from '@scalar/fastify-api-reference'

import { router } from '@/routers'

import { cors } from './cors'
import { swaggerConfig } from './swagger'

const isLocal = process.env.LOCAL === 'true'

const server = Fastify({ logger: isLocal })

server.register(fastifyCors, cors)
server.register(fastifySwagger, swaggerConfig)
server.register(ScalarApiReference, {
  routePrefix: '/docs'
})

server.register(router, {
  prefix: '/'
})

export { server }
