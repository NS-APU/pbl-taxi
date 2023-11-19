import { Test, TestingModule } from '@nestjs/testing';
import { PlaceListService } from './place-list.service';

describe('ReserveListService', () => {
  let service: PlaceListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaceListService],
    }).compile();

    service = module.get<PlaceListService>(PlaceListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
