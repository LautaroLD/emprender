import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CatalogDto } from './dto/catalog.dto';
import { BadRequestDto, NotFoundDto } from 'src/errors/dto/errors.dto';

@ApiTags('catalogs')
@ApiBearerAuth()
@Controller('catalogs')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @ApiCreatedResponse({
    description: 'The catalog has been successfully created.',
    type: CatalogDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: BadRequestDto,
  })
  @Post()
  create(@Body() createCatalogDto: CreateCatalogDto): object {
    return this.catalogService.create(createCatalogDto);
  }

  @ApiOkResponse({ type: [CatalogDto] })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiNotFoundResponse({ description: 'Business not found', type: NotFoundDto })
  @Get(':id/business')
  findAll(@Param('id') id: string): object {
    return this.catalogService.findAll(id);
  }

  @ApiOkResponse({ type: CatalogDto })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiNotFoundResponse({ description: 'Catalog Not Found', type: NotFoundDto })
  @Get(':id')
  findOne(@Param('id') id: string): object {
    return this.catalogService.findOne(id);
  }

  @ApiOkResponse({ type: CatalogDto })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiNotFoundResponse({ description: 'Catalog not found', type: NotFoundDto })
  @Patch(':id/catalog')
  update(
    @Param('id') id: string,
    @Body() updateCatalogDto: UpdateCatalogDto,
  ): object {
    return this.catalogService.update(id, updateCatalogDto);
  }

  @ApiOkResponse({ description: 'Catalog deleted succesfully' })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiNotFoundResponse({ description: 'Catalog not found', type: NotFoundDto })
  @Delete(':id')
  remove(@Param('id') id: string): object {
    return this.catalogService.remove(id);
  }
}
