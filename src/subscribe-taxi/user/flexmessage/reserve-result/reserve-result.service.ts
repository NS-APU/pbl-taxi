import { Injectable } from '@nestjs/common';
import { FlexMessage, FlexBubble } from '@line/bot-sdk';
import * as dayjs from 'dayjs';

export type TReserveResult = {
  pickupspot: string;
  pickupdate: Date;
  dropoffspot: string;
  dropoffdate: Date;
};

@Injectable()
export class ReserveResultService {
  convert(reserveresult: TReserveResult): FlexMessage {
    return {
      type: 'flex',
      altText: '予約完了メッセージ',
      contents: this.bubble(
        reserveresult.pickupspot,
        reserveresult.pickupdate,
        reserveresult.dropoffspot,
        reserveresult.dropoffdate,
      ),
    };
  }

  private bubble(
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
        backgroundColor: '#27ACB2',
        contents: [
          {
            type: 'text',
            text: '予約完了',
            size: 'xxl',
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
    };
  }
}
