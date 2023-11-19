import { Injectable } from '@nestjs/common';
import { LineService } from 'src/common/line.service';
import { LocationMessage } from '@line/bot-sdk';

@Injectable()
export class DriverService {
  constructor(private readonly LineService: LineService) {}

  async notifyDriver(locationmessage: LocationMessage) {
    return await this.LineService.broadcastMessage(locationmessage);
  }
}
