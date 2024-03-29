import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { SubscribeTaxiModule } from './subscribe-taxi/subscribe-taxi.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CommonModule,
    SubscribeTaxiModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
