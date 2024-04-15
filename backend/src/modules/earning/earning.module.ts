import { Module } from '@nestjs/common';
import { EarningController } from './earning.controller';
import { EarningService } from './earning.service';
import { earningProviders } from './earning.providers';
import { businessProviders } from '../business/business.provider';

@Module({
  controllers: [EarningController],
  providers: [EarningService, ...earningProviders, ...businessProviders],
})
export class EarningModule {}
