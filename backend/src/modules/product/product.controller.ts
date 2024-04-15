import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';
import { BadRequestDto, NotFoundDto } from 'src/errors/dto/errors.dto';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiCreatedResponse({
    description: 'The product has been successfully created.',
    type: ProductDto,
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto): object {
    return this.productService.create(createProductDto);
  }

  @ApiOkResponse({ type: [ProductDto] })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiNotFoundResponse({ description: 'Not Found', type: NotFoundDto })
  @Get(':id/bussiness')
  findAll(@Param('id') id: string): object {
    return this.productService.findAll(id);
  }

  @ApiOkResponse({ type: ProductDto })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiNotFoundResponse({ description: 'Not Found', type: NotFoundDto })
  @Get(':id')
  findOne(@Param('id') id: string): object {
    return this.productService.findOne(id);
  }

  @ApiOkResponse({ type: ProductDto })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiNotFoundResponse({ description: 'Not Found', type: NotFoundDto })
  @Patch(':id/product')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): object {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOkResponse({ description: 'Product deleted succesfully' })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiNotFoundResponse({ description: 'Catalog not found', type: NotFoundDto })
  @Delete(':id')
  remove(@Param('id') id: string): object {
    return this.productService.remove(id);
  }
}
