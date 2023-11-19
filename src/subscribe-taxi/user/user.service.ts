import { Injectable } from '@nestjs/common';
import { FlexmessageService } from './flexmessage/flexmessage.service';
import { LineService } from 'src/common/line.service';
import {
  WebhookRequestBody,
  WebhookEvent,
  EventMessage,
  TextEventMessage,
  Message,
} from '@line/bot-sdk';
import * as dayjs from 'dayjs';
import { TPlaceList } from './flexmessage/place-list/place-list.service';

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
    const now = new Date();
    const text = message.text;

    const place = await this.getPlaceMock();

    if (text.includes('タクシー') && text.includes('呼')) {
      const reply: Message = {
        type: 'text',
        text: 'どちらに行かれますか？',
      };

      const placelist = await Promise.all(
        place.map(async (p): Promise<TPlaceList> => {
          return {
            headercolor: p.headercolor,
            pickupspot: 'ご自宅',
            pickupdate: now,
            dropoffspot: p.spot,
            dropoffdate: dayjs(now).add(p.eta, 'minute').toDate(),
          };
        }),
      );
      const flexmessage =
        await this.FlexmessageService.createPlaceListMessage(placelist);

      return await this.LineService.replyMessage(replyToken, [
        reply,
        flexmessage,
      ]);
    }
    switch (message.text) {
      case '予約結果':
        return await this.viewReserveResultDemo(replyToken);
      default:
        return;
    }
  }

  private async getPlaceMock() {
    const hospital = {
      headercolor: '#FF6B6E',
      spot: '由利組合総合病院',
      eta: 6,
    };
    const postoffice = {
      headercolor: '#FF6B6E',
      spot: '本荘郵便局',
      eta: 12,
    };
    const market = {
      headercolor: '#27ACB2',
      spot: 'マックスバリュ中央店',
      eta: 4,
    };

    return [hospital, market, postoffice];
  }

  private async viewReserveResultDemo(replyToken: string) {
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
