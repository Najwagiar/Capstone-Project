import { Test, TestingModule } from '@nestjs/testing';
import { PredictionsController } from './predictions.controller.js';

describe('PredictionsController', () => {
  let controller: PredictionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PredictionsController],
    }).compile();

    controller = module.get<PredictionsController>(PredictionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
