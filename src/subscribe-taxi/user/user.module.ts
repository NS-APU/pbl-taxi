import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { FlexmessageModule } from './flexmessage/flexmessage.module';
import { CommonModule } from 'src/common/common.module';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { DriverModule } from '../driver/driver.module';

@Module({
  imports: [
    FlexmessageModule,
    CommonModule.registerLineService({
      useFactory: async (ConfigService: ConfigService) => {
        return {
          channelAccessToken: ConfigService.get<string>(
            'SUBSCLIBE_USER_CHANNEL_ACCESS_TOKEN',
          ),
          channelSecret: ConfigService.get<string>(
            'SUBSCLIBE_USER_CHANNEL_SECRET',
          ),
        };
      },
      inject: [ConfigService],
    }),
    DriverModule,
    CacheModule.register(),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
