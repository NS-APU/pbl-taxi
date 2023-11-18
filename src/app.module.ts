import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LineModule } from './line/line.module';
import { UserModule } from './user/user.module';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [LineModule, UserModule, DriverModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
