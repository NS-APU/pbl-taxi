import { Module } from '@nestjs/common';
import { DriverModule } from './driver/driver.module';
import { UserModule } from './user/user.module';
import { SubscribeTaxiController } from './subscribe-taxi.controller';

@Module({
  controllers: [SubscribeTaxiController],
  imports: [DriverModule, UserModule],
})
export class SubscribeTaxiModule {}
