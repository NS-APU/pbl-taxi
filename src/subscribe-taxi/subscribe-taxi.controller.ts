import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user/user.service';
import { WebhookRequestBody } from '@line/bot-sdk';

@Controller('subscribe-taxi')
export class SubscribeTaxiController {
  constructor(private readonly UserService: UserService) {}

  @Post('/user/')
  async handler(@Body() request: WebhookRequestBody) {
    return await this.UserService.rootHandler(request);
  }
}
