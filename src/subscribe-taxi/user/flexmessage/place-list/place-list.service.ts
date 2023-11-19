import { Injectable } from '@nestjs/common';
import { FlexMessage, FlexBubble } from '@line/bot-sdk';
import * as dayjs from 'dayjs';

export type TPlaceList = {
  headercolor: string;
  pickupspot: string;
  pickupdate: Date;
  dropoffspot: string;
  dropoffdate: Date;
};

@Injectable()
export class PlaceListService {
  async convert(placelist: TPlaceList[]): Promise<FlexMessage> {
    return {
      type: 'flex',
      altText: '行き先一覧メッセージ',
      contents: {
        type: 'carousel',
        contents: await Promise.all(
          placelist.map(
            async (place) =>
              await this.bubble(
                place.headercolor,
                place.pickupspot,
                place.pickupdate,
                place.dropoffspot,
                place.dropoffdate,
              ),
          ),
        ),
      },
    };
  }

  private bubble(
    headercolor: string,
    pickupspot: string,
    pickupdate: Date,
    dropoffspot: string,
    dropoffdate: Date,
  ): FlexBubble {
    return {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: headercolor,
        contents: [
          {
            type: 'text',
            text: `${dropoffspot}行き`,
            size: 'xl',
            color: '#ffffff',
            weight: 'bold',
          },
        ],
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          /*
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: pickupspot,
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: dayjs(pickupdate).format('YYYY/MM/DD'),
                    align: 'end',
                  },
                  {
                    type: 'text',
                    text: dayjs(pickupdate).format('HH:mm'),
                    align: 'end',
                  },
                ],
              },
            ],
          },
*/
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: dropoffspot,
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: dayjs(dropoffdate).format('YYYY/MM/DD'),
                    align: 'end',
                  },
                  {
                    type: 'text',
                    text: dayjs(dropoffdate).format('HH:mm'),
                    align: 'end',
                  },
                ],
              },
            ],
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'horizontal',
        contents: [
          {
            type: 'button',
            style: 'primary',
            action: {
              type: 'message',
              label: 'ここへ行く',
              text: `${pickupspot}から${dropoffspot}へ行く`,
            },
          },
        ],
      },
    };
  }
}
