import { Module } from '@nestjs/common';
import { LineService } from './line.service';

@Module({
  providers: [LineService],
})
export class CommonModule {}
