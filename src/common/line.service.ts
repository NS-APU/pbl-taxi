import { Injectable } from '@nestjs/common';
import { Client, Message } from '@line/bot-sdk';

export type TLineConfig = {
  channelAccessToken: string;
  channelSecret: string;
};

@Injectable()
export class LineService {
  private readonly client: Client;

  constructor(private readonly config: TLineConfig) {
    this.client = new Client(config);
  }

  async replyMessage(replyToken: string, message: Message) {
    await this.client.replyMessage(replyToken, message);
  }
}
