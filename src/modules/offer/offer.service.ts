import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import slugify from 'slugify';
import { Offer } from './entity/offer.entity';
import { OfferDto } from './offer.dto';
import { OfferRepository } from './offer.repository';
import offer1Payload from './static-data/provider1.payload';
import offer2Payload from './static-data/provider2.payload';

@Injectable()
export class OfferService {
  private readonly offers: OfferDto[];

  constructor(
    @InjectRepository(OfferRepository) private offerRepository: OfferRepository,
  ) {}

  public async register(offer: OfferDto): Promise<Offer> {
    return this.offerRepository.save({ ...offer });
  }

  async mapProvider1OfferDtos(): Promise<OfferDto[]> {
    const payloadOffers = offer1Payload.response.offers;

    const dtoArr = payloadOffers.map((offer) => {
      const isMobile = offer.platform === 'mobile';
      const isIOS =
        (isMobile && offer.device.includes('iphone')) ||
        offer.device.includes('ipad');

      const isIndroid =
        (isMobile && !offer.device.includes('iphone')) ||
        !offer.device.includes('ipad');

      return new OfferDto(
        'provider1',
        offer.offer_id,
        offer.offer_name,
        offer.offer_desc,
        offer.call_to_action,
        offer.offer_url,
        offer.image_url,
        +isMobile,
        +isIndroid,
        +isIOS,
        this.generateSlug(offer.offer_name),
      );
    });

    const validatedOffers = await Promise.all(
      dtoArr.map(async (item) => {
        const err = await validate(item);

        if (err.length > 0) {
          console.warn('Skipping offer');
        } else {
          return item;
        }
      }),
    );

    return validatedOffers.filter((item) => item);
  }

  async mapProvider2OfferDtos(): Promise<OfferDto[]> {
    const payloadOffers = offer2Payload.data;

    const dtoArr = Object.values(payloadOffers).map(({ Offer, OS }) => {
      return new OfferDto(
        'provider2',
        Offer.campaign_id.toString(),
        Offer.name,
        Offer.description,
        Offer.instructions,
        Offer.tracking_url,
        Offer.icon,
        +OS.web,
        +OS.android,
        +OS.ios,
        this.generateSlug(Offer.name),
      );
    });

    const validatedOffers = await Promise.all(
      dtoArr.map(async (item) => {
        const err = await validate(item);

        if (err.length > 0) {
          console.warn('Skipping offer');
        } else {
          return item;
        }
      }),
    );

    return validatedOffers.filter((item) => item);
  }

  private generateSlug(title: string): string {
    return slugify(title, {
      lower: true,
      strict: true,
    });
  }
}
