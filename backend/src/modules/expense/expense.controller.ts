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
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create.dto';
import { ExpenseDto } from './dto/expense.dto';
import { BadRequestDto, NotFoundDto } from 'src/errors/dto/errors.dto';
import { EarningDTO } from '../earning/dto/earning.dto';

class ExpenseAndEarnings {
  @ApiProperty()
  expenses: ExpenseDto[];

  @ApiProperty()
  earnings: EarningDTO[];
}

@ApiTags('expenses')
@ApiBearerAuth()
@Controller('expenses')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @ApiCreatedResponse({
    description: 'The expense has been successfully created',
    type: ExpenseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @Post()
  create(@Body() dto: CreateExpenseDto): object {
    return this.expenseService.create(dto);
  }

  @ApiOkResponse({
    type: ExpenseAndEarnings,
  })
  @ApiNotFoundResponse({ description: 'Business not found', type: NotFoundDto })
  @Get(':id/business')
  getAllByBusiness(
    @Param('id') id: string,
    @Query('start') startDate: Date,
    @Query('end') endDate: Date,
  ): object {
    return this.expenseService.getAllByBusiness(id, startDate, endDate);
  }

  @ApiOkResponse({
    type: [ExpenseDto],
  })
  @ApiNotFoundResponse({ description: 'Business not found', type: NotFoundDto })
  @Get('earnings/:id/business')
  getExpensesAndEarningsByBusiness(
    @Param('id') id: string,
    @Query('start') startDate: Date,
    @Query('end') endDate: Date,
  ): object {
    return this.expenseService.getExpensesAndEarningsByBusiness(
      id,
      startDate,
      endDate,
    );
  }

  @ApiOkResponse({
    type: ExpenseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiNotFoundResponse({ description: 'Expense not found', type: NotFoundDto })
  @Get(':id')
  getById(@Param('id') id: string): object {
    return this.expenseService.getById(id);
  }

  @ApiOkResponse({ description: 'Expense deleted succesfully' })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiNotFoundResponse({ description: 'Expense not found', type: NotFoundDto })
  @Delete(':id')
  delete(@Param('id') id: string): object {
    return this.expenseService.deleteById(id);
  }
}
