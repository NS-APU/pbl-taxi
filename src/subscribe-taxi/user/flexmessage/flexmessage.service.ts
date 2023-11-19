import { Injectable } from '@nestjs/common';
import {
  ReserveResultService,
  TReserveResult,
} from './reserve-result/reserve-result.service';
import { PlaceListService, TPlaceList } from './place-list/place-list.service';

@Injectable()
export class FlexmessageService {
  constructor(
    private readonly ReserveResultService: ReserveResultService,
    private readonly PlaceListService: PlaceListService,
  ) {}

  async createReserveResultMessage(reserveresult: TReserveResult) {
    return this.ReserveResultService.convert(reserveresult);
  }

  async createPlaceListMessage(placelist: TPlaceList[]) {
    return this.PlaceListService.convert(placelist);
  }
}
