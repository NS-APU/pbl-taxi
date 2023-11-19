import { Test, TestingModule } from '@nestjs/testing';
import { SubscribePlanService } from './subscribe-plan.service';

describe('SubscribePlanService', () => {
  let service: SubscribePlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscribePlanService],
    }).compile();

    service = module.get<SubscribePlanService>(SubscribePlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
