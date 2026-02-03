import { prisma } from '@/lib/prisma'
import { Urls } from '../dto/Urls'

class UrlService {
  domain = process.env.DOMAIN_URL || 'http://localhost:3001'

  async checkExistingShortUrl(url: string): Promise<boolean> {
    const find = await prisma.url.findFirst({
      where: { short: url }
    })

    return find !== null
  }

  async createShortUrl(url: string, temp: boolean = true): Promise<string> {
    let shortUrl = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const length = 7

    do {
      shortUrl = ''
      for (let i = 0; i < length; i++) {
        shortUrl += characters.charAt(
          Math.floor(Math.random() * characters.length)
        )
      }
    } while (await this.checkExistingShortUrl(shortUrl))

    if (temp) {
      const expireAt = new Date()
      // expireAt.setHours(expireAt.getHours() + 12) // Expira em 12 horas
      expireAt.setMinutes(expireAt.getMinutes() + 5) // Expira em 5 minutos
      await prisma.url.create({
        data: {
          original: url,
          short: shortUrl,
          isTemp: temp,
          expireAt: expireAt
        }
      })
    } else {
      await prisma.url.create({
        data: {
          original: url,
          short: shortUrl,
          isTemp: temp
        }
      })
    }

    return `${this.domain}/${shortUrl}`
  }

  async getAllUrls(): Promise<Urls[]> {
    const urls = await prisma.url.findMany()
    return urls
  }
}

export { UrlService }
