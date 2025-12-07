import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: SignupDto) {
    return this.authService.signUp(dto.email, dto.password);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(dto.email, dto.password);

    res.cookie('auth_token', token.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // true in production
    });

    return { message: 'Logged in' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: Request & { user: any }) {
    return req.user;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth_token');
    return { message: 'Logged out' };
  }
}
