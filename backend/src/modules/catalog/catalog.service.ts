import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { Catalog } from './catalog.entity';
import { Business } from '../business/business.entity';

@Injectable()
export class CatalogService {
  constructor(
    @Inject('CATALOG_REPOSITORY')
    private readonly catalogRepository: typeof Catalog,
    @Inject('BUSINESS_REPOSITORY')
    private readonly businessRepository: typeof Business,
  ) {}

  async create(createCatalogDto: CreateCatalogDto) {
    const catalog = await this.catalogRepository.create({
      ...createCatalogDto,
    });
    return { catalog };
  }

  async findAll(id: string) {
    const business = await this.businessRepository.findByPk(id);
    if (!business) throw new NotFoundException('Business not found');

    const catalogs = await this.catalogRepository.findAll({
      where: { business_id: business.id },
    });

    return { catalogs };
  }

  async findOne(id: string) {
    const catalog = await this.catalogRepository.findByPk(id);
    if (!catalog) throw new NotFoundException('Catalog not found');

    return { catalog };
  }

  async update(id: string, updateCatalogDto: UpdateCatalogDto) {
    const catalog = this.catalogRepository.update(updateCatalogDto, {
      where: { id },
    });
    if (!catalog) throw new NotFoundException('Catalog not found');
    const catalogUpdate = await this.catalogRepository.findByPk(id);
    return { catalogUpdate };
  }

  async remove(id: string) {
    const catalog = this.catalogRepository.findByPk(id);
    if (!catalog) throw new NotFoundException('Catalog not found');
    await this.catalogRepository.destroy({ where: { id } });
    return { message: 'Catalog deleted successfully' };
  }
}
