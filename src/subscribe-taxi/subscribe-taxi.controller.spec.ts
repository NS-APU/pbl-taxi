import { Test, TestingModule } from '@nestjs/testing';
import { SubscribeTaxiController } from './subscribe-taxi.controller';

describe('SubscribeTaxiController', () => {
  let controller: SubscribeTaxiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscribeTaxiController],
    }).compile();

    controller = module.get<SubscribeTaxiController>(SubscribeTaxiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
