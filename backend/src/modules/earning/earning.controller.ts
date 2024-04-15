import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EarningService } from './earning.service';
import { CreateEarningDto } from './dto/create.dto';
import { EarningDTO } from './dto/earning.dto';
import { BadRequestDto, NotFoundDto } from 'src/errors/dto/errors.dto';

@ApiTags('earnings')
@ApiBearerAuth()
@Controller('earnings')
export class EarningController {
  constructor(private earningService: EarningService) {}

  @ApiCreatedResponse({
    description: 'The earning has been successfully created',
    type: EarningDTO,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @Post()
  create(@Body() dto: CreateEarningDto): object {
    return this.earningService.create(dto);
  }

  @ApiOkResponse({
    type: [EarningDTO],
  })
  @ApiNotFoundResponse({ description: 'Business not found', type: NotFoundDto })
  @Get(':id/business')
  getAllByBusiness(
    @Param('id') id: string,
    @Query('start') startDate: Date,
    @Query('end') endDate: Date,
  ): object {
    return this.earningService.getAllByBusiness(id, startDate, endDate);
  }

  @ApiOkResponse({
    type: EarningDTO,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiNotFoundResponse({ description: 'Earning not found', type: NotFoundDto })
  @Get(':id')
  getById(@Param('id') id: string): object {
    return this.earningService.getById(id);
  }

  @ApiOkResponse({ description: 'Earning deleted succesfully' })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiNotFoundResponse({ description: 'Earning not found', type: NotFoundDto })
  @Delete(':id')
  delete(@Param('id') id: string): object {
    return this.earningService.deleteById(id);
  }
}
