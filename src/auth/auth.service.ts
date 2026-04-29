import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new BadRequestException('email already registerd');
    }

    const hashedpassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.userService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedpassword,
      role: 'USER',
    });

    const { password, ...safeUser } = user;

    return safeUser;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentails');
    }

    const isPsswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPsswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
