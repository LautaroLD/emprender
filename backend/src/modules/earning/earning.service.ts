import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Earning } from './earning.entity';
import { CreateEarningDto } from './dto/create.dto';
import { Business } from '../business/business.entity';
import { Op } from 'sequelize';

@Injectable()
export class EarningService {
  constructor(
    @Inject('EARNING_REPOSITORY')
    private earningRepository: typeof Earning,
    @Inject('BUSINESS_REPOSITORY')
    private businessRepository: typeof Business,
  ) {}

  async getAllByBusiness(id: string, startDate: Date, endDate: Date) {
    const business = await this.businessRepository.findByPk(id);
    if (!business) throw new NotFoundException('Business not found');

    let earnings = [];
    if (startDate && endDate) {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
      endDate.setDate(endDate.getDate() + 1);
      earnings = await this.earningRepository.findAll({
        where: {
          business_id: business.id,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
    } else {
      earnings = await this.earningRepository.findAll({
        where: {
          business_id: business.id,
        },
      });
    }

    return { earnings };
  }

  async getById(id: string) {
    const earning = await this.earningRepository.findByPk(id);
    if (!earning) throw new NotFoundException('Earning not found');

    return { earning };
  }

  async create(dto: CreateEarningDto) {
    const earning = await this.earningRepository.create({ ...dto });
    return { earning };
  }

  async deleteById(id: string) {
    const earning = await this.earningRepository.findByPk(id);
    if (!earning) throw new NotFoundException('Earning not found');
    earning.destroy();

    return { message: 'earning deleted' };
  }
}
