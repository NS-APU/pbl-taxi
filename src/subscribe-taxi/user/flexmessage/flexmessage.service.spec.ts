import { Test, TestingModule } from '@nestjs/testing';
import { FlexmessageService } from './flexmessage.service';

describe('FlexmessageService', () => {
  let service: FlexmessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlexmessageService],
    }).compile();

    service = module.get<FlexmessageService>(FlexmessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
