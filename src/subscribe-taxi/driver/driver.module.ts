import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DriverService } from './driver.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    CommonModule.registerLineService({
      useFactory: async (ConfigService: ConfigService) => {
        return {
          channelAccessToken: ConfigService.get<string>(
            'SUBSCLIBE_DRIVER_CHANNEL_ACCESS_TOKEN',
          ),
          channelSecret: ConfigService.get<string>(
            'SUBSCLIBE_DRIVER_CHANNEL_SECRET',
          ),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriverModule {}
