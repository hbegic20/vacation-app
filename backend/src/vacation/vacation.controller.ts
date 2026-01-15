import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('vacations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VacationController {
  @Post()
  @Roles(Role.ADMIN)
  createVacationPolicy() {
    return { message: 'ADMIN only – Day 5 works ✅' };
  }
}
