import { Injectable } from '@nestjs/common';
import { FlexmessageService } from './flexmessage/flexmessage.service';
import { LineService } from 'src/common/line.service';
import {
  WebhookRequestBody,
  WebhookEvent,
  EventMessage,
  TextEventMessage,
} from '@line/bot-sdk';

@Injectable()
export class UserService {
  constructor(
    private readonly FlexmessageService: FlexmessageService,
    private readonly LineService: LineService,
  ) {}

  async rootHandler(request: WebhookRequestBody) {
    const events: WebhookEvent[] = request.events;
    console.log(events);
    events.map(async (event) => {
      if (event.source.type !== 'user') {
        return;
      }

      // let userId = event.source.userId;
      // ... and get user profile (not implemented in this sample)

      switch (event.type) {
        case 'follow':
          return await this.followHandler(event.replyToken);
        case 'message':
          return await this.messageHandler(event.message, event.replyToken);
        default:
          return;
      }
    });
  }

  private async followHandler(replyToken: string) {
    await this.LineService.replyMessage(replyToken, {
      type: 'text',
      text: '友達登録ありがとうございます！',
    });
  }

  private async messageHandler(message: EventMessage, replyToken: string) {
    switch (message.type) {
      case 'text':
        return await this.textHandler(message, replyToken);
      default:
        return;
    }
  }

  private async textHandler(message: TextEventMessage, replyToken: string) {
    switch (message.text) {
      case '予約一覧':
      case '予約結果':
        return await this.viewReserveResultDemo(replyToken);
      default:
        return;
    }
  }

  async viewReserveResultDemo(replyToken: string) {
    const reserveresult = {
      pickupspot: 'ご自宅',
      pickupdate: new Date(),
      dropoffspot: '組合病院',
      dropoffdate: new Date(),
    };
    return await this.LineService.replyMessage(
      replyToken,
      await this.FlexmessageService.createReserveResultMessage(reserveresult),
    );
  }
}
