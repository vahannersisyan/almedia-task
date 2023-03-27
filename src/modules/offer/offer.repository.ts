import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Offer } from './entity/offer.entity';

@Injectable() // here
export class OfferRepository extends Repository<Offer> {
  constructor(private dataSource: DataSource) {
    super(Offer, dataSource.createEntityManager());
  }
}
