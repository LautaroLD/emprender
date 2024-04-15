import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/user.entity';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Op } from 'sequelize';
import { SignUpAndBusinessDto } from './dto/signupAndBusiness.dto';
import { Business } from 'src/modules/business/business.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    @Inject('BUSINESS_REPOSITORY')
    private businessRepository: typeof Business,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignUpDto) {
    const checkUser = await this.checkUser(dto.email, dto.phone);
    if (checkUser) throw new ForbiddenException('User already exists');
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.create({ ...dto, password: hash });

    const access_token = await this.signToken(user.id, user.email);

    delete user.dataValues.password;
    return { user, access_token };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        [Op.or]: [{ email: dto.identifier }, { phone: dto.identifier }],
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new ForbiddenException('Password incorrect');

    const acces_token = await this.signToken(user.id, user.email);

    delete user.dataValues.password;
    return { user, acces_token };
  }

  async signupAndBusiness(dto: SignUpAndBusinessDto) {
    const checkUser = await this.checkUser(dto.user.email, dto.user.phone);
    if (checkUser) throw new ForbiddenException('User already exists');
    const hash = await bcrypt.hash(dto.user.password, 10);
    const user = await this.userRepository.create({
      ...dto.user,
      password: hash,
    });

    const access_token = await this.signToken(user.id, user.email);

    delete user.dataValues.password;

    const business = await this.businessRepository.create({
      ...dto.business,
      user_id: user.id,
    });
    return { user, business, access_token };
  }

  async signToken(userId: string, email: string) {
    const payload = { sub: userId, email };
    const token = await this.jwtService.signAsync(payload);

    return token;
  }

  async checkUser(email: string, phone: string) {
    let whereClause: any = {};

    if (email) {
      whereClause.email = email;
    }

    if (phone) {
      whereClause = {
        [Op.or]: [whereClause, { phone: phone }],
      };
    }

    const user = await this.userRepository.findOne({ where: whereClause });

    return user ? true : false;
  }
}
