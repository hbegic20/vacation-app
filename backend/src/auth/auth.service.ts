import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuthService {
  jwtService: any;
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signUp(email: string, password: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });

    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { email, passwordHash: hashed, role: 'ADMIN' },
    });

    const token = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return { access_token: token };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return { access_token: token };
  }
}
