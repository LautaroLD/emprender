import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { expenseProviders } from './expense.providers';
import { businessProviders } from '../business/business.provider';
import { EarningService } from '../earning/earning.service';
import { earningProviders } from '../earning/earning.providers';

@Module({
  controllers: [ExpenseController],
  providers: [
    ExpenseService,
    EarningService,
    ...expenseProviders,
    ...businessProviders,
    ...earningProviders,
  ],
})
export class ExpenseModule {}
