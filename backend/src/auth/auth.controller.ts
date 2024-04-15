import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { BadRequestDto, ForibiddenDto } from 'src/errors/dto/errors.dto';
import { SignUpAndBusinessDto } from './dto/signupAndBusiness.dto';
class AuthResponse {
  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  access_token: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @ApiCreatedResponse({
    description: 'The user has been successfully created',
    type: AuthResponse,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiForbiddenResponse({
    description: 'Credentials incorrect',
    type: ForibiddenDto,
  })
  signup(@Body() dto: SignUpDto): object {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('login')
  @ApiCreatedResponse({
    description: 'Login succesfully',
    type: AuthResponse,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiForbiddenResponse({
    description: 'Credentials incorrect',
    type: ForibiddenDto,
  })
  login(@Body() dto: LoginDto): object {
    return this.authService.login(dto);
  }

  @Public()
  @Post('business/signup')
  @ApiCreatedResponse({
    description: 'The user has been successfully created',
    /* type: AuthResponse, */
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiForbiddenResponse({
    description: 'Credentials incorrect',
    type: ForibiddenDto,
  })
  signUpAndBusiness(@Body() dto: SignUpAndBusinessDto): object {
    return this.authService.signupAndBusiness(dto);
  }
}
