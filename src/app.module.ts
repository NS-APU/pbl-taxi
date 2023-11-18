import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { SubscribeTaxiModule } from './subscribe-taxi/subscribe-taxi.module';

@Module({
  imports: [CommonModule, SubscribeTaxiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
