import { UrlService } from '../services/UrlService'
import { ShortUrlRequest } from '../dto/shorturl-request'
import { ShortUrlResponse } from '../dto/shorturl-response'

class UrlController {
  urlService = new UrlService()

  constructor() {}

  async createTempShortUrl(data: ShortUrlRequest): Promise<ShortUrlResponse> {
    const { url } = data

    const shortUrl = await this.urlService.createShortUrl(url, true)
    return { shortUrl }
  }
}

export { UrlController }
