import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create.dto';
import { BadRequestDto, NotFoundDto } from 'src/errors/dto/errors.dto';
import { BusinessDto } from './dto/business.dto';

@ApiTags('businesses')
@ApiBearerAuth()
@Controller('businesses')
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @ApiCreatedResponse({
    description: 'The business has been successfully created',
    type: BusinessDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @Post()
  create(@Body() dto: CreateBusinessDto, @Req() req: Request): object {
    return this.businessService.create(dto, req);
  }

  @ApiOkResponse({
    type: [BusinessDto],
  })
  @Get()
  getAll(@Req() req: Request): object {
    return this.businessService.getAllByUser(req);
  }

  @ApiOkResponse({
    type: BusinessDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiNotFoundResponse({ description: 'Business not found', type: NotFoundDto })
  @Get(':id')
  getById(@Param('id') id: string): object {
    return this.businessService.getById(id);
  }

  @ApiOkResponse({ description: 'Business deleted succesfully' })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiNotFoundResponse({ description: 'Business not found', type: NotFoundDto })
  @Delete(':id')
  delete(@Param('id') id: string): object {
    return this.businessService.deleteById(id);
  }
}
