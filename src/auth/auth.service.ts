import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async register(createAuthDto: CreateAuthDto) {
    const { email, password, name } = createAuthDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('อีเมลนี้ถูกใช้งานแล้ว');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const { password: _, ...result } = newUser

    return result;
  }

  async login(email: string, password: string) {
    const findUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!findUser) {
      throw new UnauthorizedException('ไม่พบอีเมลในระบบ');
    }

    const findPassword = await bcrypt.compare(password, findUser.password);

    if (!findPassword) {
      throw new UnauthorizedException('รหัสผ่านไม่ถูกต้อง');
    }

    const payload = {
      email: email,
      password: password,
    };

    const token = this.jwtService.sign(payload);

    return {
      success: true,
      message: 'เข้าสู่ระบบสำเร็จ',
      result: {
        name: findUser.name,
        email: findUser.email,
        accessToken: token,
      },
    };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
