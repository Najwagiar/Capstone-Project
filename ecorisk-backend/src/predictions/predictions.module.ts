
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PredictionsController } from './predictions.controller.js';
import { PredictionsService } from './predictions.service.js';

import { Prediction } from './entities/prediction.entity.js';
import { Location } from '../locations/entities/location.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prediction, Location]),
  ],
  controllers: [PredictionsController],
  providers: [PredictionsService],
  exports: [PredictionsService],
})
export class PredictionsModule {}
