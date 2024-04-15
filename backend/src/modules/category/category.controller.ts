import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create.dto';
import { BadRequestDto, NotFoundDto } from 'src/errors/dto/errors.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiCreatedResponse({
    description: 'The category has been successfully created',
    type: CategoryDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @Post()
  create(@Body() dto: CreateCategoryDto): object {
    return this.categoryService.create(dto);
  }

  @ApiOkResponse({
    type: [CategoryDto],
  })
  @Public()
  @Get()
  getAll(): object {
    return this.categoryService.getAll();
  }

  @ApiOkResponse({
    type: CategoryDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiNotFoundResponse({ description: 'Category not found', type: NotFoundDto })
  @Get(':id')
  get(@Param('id') id: string): object {
    return this.categoryService.getById(id);
  }

  @ApiOkResponse({ description: 'Category deleted succesfully' })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiNotFoundResponse({ description: 'Category not found', type: NotFoundDto })
  @Delete(':id')
  delete(@Param('id') id: string): object {
    return this.categoryService.deleteById(id);
  }
}
