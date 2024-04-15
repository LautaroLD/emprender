import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsObject,
  IsDateString,
} from 'class-validator';
import { CategoryDto } from 'src/modules/category/dto/category.dto';

export class BusinessDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  category_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  category: CategoryDto;

  @ApiProperty()
  @IsDateString()
  createdAt: string;

  @ApiProperty()
  @IsDateString()
  updatedAt: string;
}
