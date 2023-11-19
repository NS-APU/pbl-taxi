import { Module } from '@nestjs/common';
import { PlaceListService } from './place-list/place-list.service';
import { ReserveResultService } from './reserve-result/reserve-result.service';
import { SubscribePlanService } from './subscribe-plan/subscribe-plan.service';
import { FlexmessageService } from './flexmessage.service';

@Module({
  providers: [
    PlaceListService,
    ReserveResultService,
    SubscribePlanService,
    FlexmessageService,
  ],
  exports: [FlexmessageService],
})
export class FlexmessageModule {}
