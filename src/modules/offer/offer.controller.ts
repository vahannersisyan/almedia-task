import { Controller, Post, HttpCode } from '@nestjs/common';
import { OfferService } from './offer.service';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post('/provider1')
  @HttpCode(200)
  async importProvider1Offers() {
    const validatedOffers = await this.offerService.mapProvider1OfferDtos();

    validatedOffers.forEach(async (offer) => {
      await this.offerService.register(offer);
    });
  }

  @Post('/provider2')
  @HttpCode(200)
  async importProvider2Offers() {
    const validatedOffers = await this.offerService.mapProvider2OfferDtos();

    validatedOffers.forEach(async (offer) => {
      await this.offerService.register(offer);
    });
  }
}
