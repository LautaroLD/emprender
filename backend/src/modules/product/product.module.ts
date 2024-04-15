import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productProviders } from './product.provider';
import { businessProviders } from '../business/business.provider';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ...productProviders, ...businessProviders],
})
export class ProductModule {}
