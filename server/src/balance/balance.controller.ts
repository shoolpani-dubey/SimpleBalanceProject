import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BalanceService } from './balance.service';
import { FindByDateInputDTO } from './dto/FindByDateInputDTO';
import { FindByDateOutputDTO } from './dto/FindByDateOutputDTO';
import { AuthGuard } from '@nestjs/passport';

@Controller('balance')
export class BalanceController {
  constructor(private bService: BalanceService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findByDate(
    @Query() qeryDTO: FindByDateInputDTO,
    @Request() req,
  ): Promise<FindByDateOutputDTO> {
    Logger.log('Entered findByDate with query:' + qeryDTO.date);
    // Assuming that authenticated user is accessing the resource.
    const authenticatedUserId = 10001;
    return this.bService.findByDate(authenticatedUserId, qeryDTO.date);
  }
}
