import { prisma } from '@/lib/prisma'
import cron from 'node-cron'

const runCleanup = async () => {
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
}

export const cleanUp = () => {
  // Executa imediatamente na subida do servidor
  runCleanup().catch(error => {
    console.error('Error executing immediate cleanup job:', error)
  })

  // Agenda para executar todos os dias às 3h da manhã
  // Minuto Hora Dia-do-mês Mês Dia-da-semana
  cron.schedule('0 3 * * *', () => {
    void runCleanup()
  })
}
