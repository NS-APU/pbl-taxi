import { Module } from '@nestjs/common';
import { ReserveListService } from './reserve-list/reserve-list.service';
import { ReserveResultService } from './reserve-result/reserve-result.service';
import { SubscribePlanService } from './subscribe-plan/subscribe-plan.service';

@Module({
  providers: [ReserveListService, ReserveResultService, SubscribePlanService],
})
export class FlexmessageModule {}
