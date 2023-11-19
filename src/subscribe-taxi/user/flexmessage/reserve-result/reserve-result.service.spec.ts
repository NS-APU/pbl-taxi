import { Test, TestingModule } from '@nestjs/testing';
import { ReserveResultService } from './reserve-result.service';

describe('ReserveResultService', () => {
  let service: ReserveResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReserveResultService],
    }).compile();

    service = module.get<ReserveResultService>(ReserveResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
