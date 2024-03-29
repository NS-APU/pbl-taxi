import { Inject, Injectable } from '@nestjs/common';
import { Client, Message, LocationMessage } from '@line/bot-sdk';

export type TLineConfig = {
  channelAccessToken: string;
  channelSecret: string;
};

@Injectable()
export class LineService {
  private readonly client: Client;

  constructor(@Inject('LINE_CONFIG') private readonly config: TLineConfig) {
    this.client = new Client(config);
  }

  async replyMessage(replyToken: string, message: Message | Message[]) {
    await this.client.replyMessage(replyToken, message);
  }

  async broadcastMessage(message: Message | Message[]) {
    await this.client.broadcast(message);
  }
}
