import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './balance/balance.module';

@Module({
  imports: [BalanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
