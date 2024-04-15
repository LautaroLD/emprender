import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Business } from './business.entity';
import { CreateBusinessDto } from './dto/create.dto';
import { Category } from '../category/category.entity';

@Injectable()
export class BusinessService {
  constructor(
    @Inject('BUSINESS_REPOSITORY')
    private businessRepository: typeof Business,
  ) {}

  async getAllByUser(req: Request) {
    const businesses = await this.businessRepository.findAll({
      where: { user_id: req['user'].sub },
      include: [
        {
          model: Category,
          as: 'category',
        },
      ],
    });
    return { businesses };
  }

  async getById(id: string) {
    const business = await this.businessRepository.findByPk(id, {
      include: [
        {
          model: Category,
          as: 'category',
        },
      ],
    });
    if (!business) throw new NotFoundException();
    return { business };
  }

  async create(dto: CreateBusinessDto, req: Request) {
    const checkBusiness = await this.businessRepository.findOne({
      where: { name: dto.name },
    });
    if (checkBusiness) throw new ConflictException('Business already exists');
    const business = await this.businessRepository.create({
      ...dto,
      user_id: req['user'].sub,
    });
    return { business };
  }

  async deleteById(id: string) {
    const business = await this.businessRepository.findByPk(id);
    if (!business) throw new NotFoundException();
    await business.destroy();

    return { message: 'Business deleted' };
  }
}
