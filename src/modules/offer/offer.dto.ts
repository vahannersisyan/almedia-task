import { IsNotEmpty, IsUrl, IsOptional, IsNumber } from 'class-validator';
import { OfferBoxSizeEnum } from './entity/offer.boxsize';

export class OfferDto {
  @IsNotEmpty()
  providerName: string;

  @IsNotEmpty()
  externalOfferId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  requirements: string;

  @IsNotEmpty()
  @IsUrl()
  offerUrlTemplate: string;

  @IsOptional()
  @IsUrl()
  thumbnail: string;

  @IsNotEmpty()
  @IsNumber()
  isDesktop: number;

  @IsNotEmpty()
  @IsNumber()
  isAndroid: number;

  @IsNotEmpty()
  @IsNumber()
  isIos: number;

  boxSize = OfferBoxSizeEnum.LARGE;

  @IsNotEmpty()
  slug;

  constructor(
    providerName: string,
    externalOfferId: string,
    name: string,
    description: string,
    requirements: string,
    offerUrlTemplate: string,
    thumbnail: string,
    isDesktop: number,
    isAndroid: number,
    isIos: number,
    slug,
  ) {
    this.providerName = providerName;
    this.externalOfferId = externalOfferId;
    this.name = name;
    this.description = description;
    this.requirements = requirements;
    this.offerUrlTemplate = offerUrlTemplate;
    this.thumbnail = thumbnail;
    this.isDesktop = isDesktop;
    this.isAndroid = isAndroid;
    this.isIos = isIos;
    this.slug = slug;
  }
}
