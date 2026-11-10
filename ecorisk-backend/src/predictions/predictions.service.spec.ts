import { Test, TestingModule } from '@nestjs/testing';
import { PredictionsService } from './predictions.service.js';

describe('PredictionsService', () => {
  let service: PredictionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PredictionsService],
    }).compile();

    service = module.get<PredictionsService>(PredictionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
