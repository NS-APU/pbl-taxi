import { Test, TestingModule } from '@nestjs/testing';
import { ReserveListService } from './reserve-list.service';

describe('ReserveListService', () => {
  let service: ReserveListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReserveListService],
    }).compile();

    service = module.get<ReserveListService>(ReserveListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
