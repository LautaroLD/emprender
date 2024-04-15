import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { catalogProviders } from './catalog.providers';
import { businessProviders } from '../business/business.provider';

@Module({
  controllers: [CatalogController],
  providers: [CatalogService, ...catalogProviders, ...businessProviders],
})
export class CatalogModule {}
