import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Expense } from './expense.entity';
import { CreateExpenseDto } from './dto/create.dto';
import { Business } from '../business/business.entity';
import { Op } from 'sequelize';
import { EarningService } from '../earning/earning.service';

@Injectable()
export class ExpenseService {
  constructor(
    @Inject('EXPENSE_REPOSITORY')
    private expenseRepository: typeof Expense,
    @Inject('BUSINESS_REPOSITORY')
    private businessRepository: typeof Business,
    private earningService: EarningService,
  ) {}

  async getAllByBusiness(id: string, startDate: Date, endDate: Date) {
    const business = await this.businessRepository.findByPk(id);
    if (!business) throw new NotFoundException('Business not found');

    let expenses = [];
    if (startDate && endDate) {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
      endDate.setDate(endDate.getDate() + 1);
      expenses = await this.expenseRepository.findAll({
        where: {
          business_id: business.id,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
    } else {
      expenses = await this.expenseRepository.findAll({
        where: { business_id: business.id },
      });
    }

    return { expenses };
  }

  async getExpensesAndEarningsByBusiness(
    id: string,
    startDate: Date,
    endDate: Date,
  ) {
    const expenses = await this.getAllByBusiness(id, startDate, endDate);
    const earnings = await this.earningService.getAllByBusiness(
      id,
      startDate,
      endDate,
    );

    return {
      expenses: expenses.expenses,
      earnings: earnings.earnings,
    };
  }

  async getById(id: string) {
    const expense = await this.expenseRepository.findByPk(id);
    if (!expense) throw new NotFoundException('Expense not found');

    return { expense };
  }

  async create(dto: CreateExpenseDto) {
    const expense = await this.expenseRepository.create({ ...dto });
    return { expense };
  }

  async deleteById(id: string) {
    const expense = await this.expenseRepository.findByPk(id);
    if (!expense) throw new NotFoundException('Expense not found');
    expense.destroy();

    return { message: 'Expense deleted' };
  }
}
