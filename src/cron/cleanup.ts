import { prisma } from '@/lib/prisma'
import cron from 'node-cron'

export const cleanUp = () => {
  // Minuto hora dia mes ano
  cron.schedule('* */24 * * *', async () => {
    console.log('Running cleanup job: Deleting expired URLs...')

    try {
      const now = new Date()

      const { count } = await prisma.url.deleteMany({
        where: {
          isTemp: {
            equals: true
          },
          expireAt: {
            lt: now
          }
        }
      })

      if (count > 0) {
        console.log(`Cleanup success: ${count} URLs deleted.`)
      } else {
        console.log('Cleanup finished: No expired URLs found.')
      }
    } catch (error) {
      console.error('Error executing cleanup job:', error)
    }
  })
}
