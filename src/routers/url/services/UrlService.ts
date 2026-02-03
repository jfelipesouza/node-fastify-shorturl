import { prisma } from '@/lib/prisma'

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
    const length = 6

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
      expireAt.setHours(expireAt.getHours() + 1) // Expira em 1 hora
      await prisma.url.create({
        data: {
          original: url,
          short: shortUrl,
          expireAt: expireAt
        }
      })
    } else {
      await prisma.url.create({
        data: {
          original: url,
          short: shortUrl
        }
      })
    }

    return `${this.domain}/${shortUrl}`
  }
}

export { UrlService }
