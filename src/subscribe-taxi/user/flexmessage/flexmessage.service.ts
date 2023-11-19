import { Injectable } from '@nestjs/common';
import {
  ReserveResultService,
  TReserveResult,
} from './reserve-result/reserve-result.service';

@Injectable()
export class FlexmessageService {
  constructor(private readonly ReserveResultService: ReserveResultService) {}

  async createReserveResultMessage(reserveresult: TReserveResult) {
    return this.ReserveResultService.convert(reserveresult);
  }
}
