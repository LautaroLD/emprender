import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: typeof Category,
  ) {}

  async getAll() {
    const categories = await this.categoryRepository.findAll();
    return { categories };
  }

  async getById(id: string) {
    const category = await this.categoryRepository.findByPk(id);
    if (!category) throw new NotFoundException();
    return { category };
  }

  async create(dto: CreateCategoryDto) {
    const category = await this.categoryRepository.create({ ...dto });
    return { category };
  }

  async deleteById(id: string) {
    const category = await this.categoryRepository.findByPk(id);
    if (!category) throw new NotFoundException();
    await category.destroy();

    return { message: 'Category deleted' };
  }
}
