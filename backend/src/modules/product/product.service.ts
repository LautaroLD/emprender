import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { Business } from '../business/business.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly productRepository: typeof Product,
    @Inject('BUSINESS_REPOSITORY')
    private readonly businessRepository: typeof Business,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.create({
      ...createProductDto,
    });

    return { product };
  }

  async findAll(id: string) {
    const business = await this.businessRepository.findByPk(id);
    if (!business) throw new NotFoundException('Business not found');

    const products = await this.productRepository.findAll({
      where: { business_id: business.id },
    });

    return { products };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findByPk(id);
    if (!product) throw new NotFoundException('Product not found');
    return { product };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findByPk(id);
    if (!product) throw new NotFoundException('Product not found');
    await this.productRepository.update(updateProductDto, {
      where: { id },
    });
    const productUpdate = await this.productRepository.findByPk(id);
    return { productUpdate };
  }

  async remove(id: string) {
    const product = this.productRepository.findByPk(id);
    if (!product) throw new NotFoundException('Catalog not found');
    await this.productRepository.destroy({ where: { id } });
    return { message: 'Catalog deleted successfully' };
  }
}
