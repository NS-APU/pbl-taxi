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
      text: `友達登録ありがとうございます！
タクシーを呼びたいとき，「タクシー呼んで」と話しかけてください。
または，「ここからマックスバリュ中央店まで行きたい」のように話しかけてください。`,
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
    const text = message.text.replace(/\s+/g, '');

    const place = await this.getPlaceMock();

    // reserve
    const reserveregex =
      /(?<pickupspot>.+)から(?<dropoffspot>.+)(ま|へ)(.*)(行き|行く)/;
    const match = text.match(reserveregex);

    if (match?.groups?.dropoffspot) {
      const pickupspot = place.find((p) =>
        p.keywords.includes(match.groups.pickupspot),
      );
      const dropoffspot = place.find((p) =>
        p.keywords.includes(match.groups.dropoffspot),
      );
      console.log(dropoffspot);
      if (!dropoffspot) {
        return await this.failedMessage(replyToken);
      }

      switch (match.groups.pickupspot) {
        case 'ご自宅':
        case '自宅':
        case '家':
          match.groups.pickupspot = 'ご自宅';
          break;
        default:
          match.groups.pickupspot = '現在地';
          break;
      }

      const reply: Message = {
        type: 'text',
        text: 'お迎えに上がります。しばらくお待ちくださいませ。',
      };

      const reserveresult = {
        pickupspot: pickupspot?.spot || match.groups.pickupspot,
        pickupdate: now,
        dropoffspot: dropoffspot.spot,
        dropoffdate: dayjs(now).add(dropoffspot.eta, 'minute').toDate(),
      };

      const flexmessage =
        await this.FlexmessageService.createReserveResultMessage(reserveresult);

      return await this.LineService.replyMessage(replyToken, [
        reply,
        flexmessage,
      ]);
    }

    // view place list
    if (text.includes('タクシー') && text.includes('呼')) {
      const reply: Message = {
        type: 'text',
        text: 'どちらに行かれますか？',
      };

      const placelist = await Promise.all(
        place.map(async (p): Promise<TPlaceList> => {
          return {
            headercolor: p.headercolor,
            pickupspot: '現在地',
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

    return await this.failedMessage(replyToken);
  }

  private async failedMessage(replyToken: string) {
    return await this.LineService.replyMessage(replyToken, {
      type: 'text',
      text: 'ごめんなさい。もう一度お願いします。',
    });
  }

  private async getPlaceMock() {
    const hospital = {
      headercolor: '#FF6B6E',
      spot: '由利組合総合病院',
      eta: 6,
      keywords: ['病院', '総合病院', '由利病院', '由利組合総合病院'],
    };
    const postoffice = {
      headercolor: '#FF6B6E',
      spot: '本荘郵便局',
      eta: 12,
      keywords: ['郵便局', '本荘郵便局'],
    };
    const market = {
      headercolor: '#27ACB2',
      spot: 'マックスバリュ中央店',
      eta: 4,
      keywords: ['スーパー', 'マックスバリュ', 'マックスバリュ中央店'],
    };

    return [hospital, market, postoffice];
  }
}
