import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { FlexmessageModule } from './flexmessage/flexmessage.module';

@Module({
  controllers: [UserController],
  imports: [FlexmessageModule],
})
export class UserModule {}
