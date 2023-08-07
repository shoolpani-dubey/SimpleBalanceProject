import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Query,
} from '@nestjs/common';
import { BalanceService } from './balance.service';
import { FindByDateInputDTO } from './dto/FindByDateInputDTO';
import { FindByDateOutputDTO } from './dto/FindByDateOutputDTO';

@Controller('balance')
export class BalanceController {
  constructor(private bService: BalanceService) {}

  @Get()
  findByDate(
    @Query() qeryDTO: FindByDateInputDTO,
  ): Promise<FindByDateOutputDTO> {
    Logger.log('Entered findByDate with query:' + qeryDTO.date);
    // Assuming that authenticated user is accessing the resource.
    const authenticatedUserId = 10001;
    return this.bService.findByDate(authenticatedUserId, qeryDTO.date);
  }
}
