import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
import { SignUpDto } from './signup.dto';
import { CreateBusinessDto } from 'src/modules/business/dto/create.dto';

export class SignUpAndBusinessDto {
  @ApiProperty()
  @IsObject()
  user: SignUpDto;

  @ApiProperty()
  @IsObject()
  business: CreateBusinessDto;
}
