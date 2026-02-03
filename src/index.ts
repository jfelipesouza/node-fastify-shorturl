import 'dotenv/config'
import { server } from '@/config/server'
import { cleanUp } from '@/cron/cleanup'

const port = process.env.PORT ? Number(process.env.PORT) : 3000

server
  .listen({ port: port, host: '0.0.0.0' })
  .then(() => {
    console.log(`Server running at port ${port}`)
    cleanUp()
  })
  .catch(err => {
    server.log.error(err)
    process.exit(1)
  })
