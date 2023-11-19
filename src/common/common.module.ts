import { DynamicModule, Module } from '@nestjs/common';
import { LineService, TLineConfig } from './line.service';
import { ConfigService } from '@nestjs/config';

export type LineConfigService = {
  useFactory: (configService: ConfigService) => Promise<TLineConfig>;
  inject: [typeof ConfigService];
};

@Module({
  providers: [],
})
export class CommonModule {
  static registerLineService(
    LineConfigService: LineConfigService,
  ): DynamicModule {
    return {
      module: CommonModule,
      providers: [
        {
          provide: 'LINE_CONFIG',
          useFactory: LineConfigService.useFactory,
          inject: LineConfigService.inject,
        },
        LineService,
      ],
      exports: [LineService],
    };
  }
}
