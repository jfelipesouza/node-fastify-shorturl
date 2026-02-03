import { CreateShortUrlRequest } from '../dto/createShortUrlRequest'
import { CreateShortUrlResponse } from '../dto/createShortUrlResponse'
import { Urls } from '../dto/Urls'
import { UrlService } from '../services/UrlService'

class UrlController {
  urlService = new UrlService()

  constructor() {}

  async createTempShortUrl(
    data: CreateShortUrlRequest
  ): Promise<CreateShortUrlResponse> {
    const { url } = data

    const shortUrl = await this.urlService.createShortUrl(url, true)
    return { shortUrl }
  }

  async getAllUrls(): Promise<Urls[]> {
    const urls = await this.urlService.getAllUrls()
    return urls
  }
}

export { UrlController }
