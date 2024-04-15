import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { businessProviders } from './business.provider';

@Module({
  controllers: [BusinessController],
  providers: [BusinessService, ...businessProviders],
})
export class BusinessModule {}
