import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BaseErrorDto {
  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsString()
  error: string;

  @ApiProperty()
  @IsNumber()
  statusCode: number;
}

export class BadRequestDto extends BaseErrorDto {
  @ApiProperty({ example: 'Validation failed' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}

export class NotFoundDto extends BaseErrorDto {
  @ApiProperty({ example: 'Not found' })
  message: string;

  @ApiProperty({ example: 'Not found' })
  error: string;

  @ApiProperty({ example: 404 })
  statusCode: number;
}

export class ForibiddenDto extends BaseErrorDto {
  @ApiProperty({ example: 'Credentials incorrect' })
  message: string;

  @ApiProperty({ example: 'Forbidden' })
  error: string;

  @ApiProperty({ example: 403 })
  statusCode: number;
}

export class UnauthorizedDto extends BaseErrorDto {
  @ApiProperty({ example: 'Unauthorized' })
  message: string;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;

  @ApiProperty({ example: 401 })
  statusCode: number;
}
