import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { BalanceServiceImpl } from './balance.service.impl';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BalanceController],
  providers: [BalanceService, BalanceServiceImpl],
})
export class BalanceModule {}
