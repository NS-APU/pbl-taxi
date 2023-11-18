import { Module } from '@nestjs/common';
import { DriverModule } from './driver/driver.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [],
  imports: [DriverModule, UserModule],
})
export class SubscribeTaxiModule {}
