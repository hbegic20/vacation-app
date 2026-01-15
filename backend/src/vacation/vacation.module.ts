import { Module } from '@nestjs/common';
import { VacationController } from './vacation.controller';

@Module({
  controllers: [VacationController],
})
export class VacationModule {}
