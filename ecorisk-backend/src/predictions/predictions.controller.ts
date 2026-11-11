
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { PredictionsService } from './predictions.service.js';
import type { CreatePredictionInput } from './predictions.service.js';

import { Prediction } from './entities/prediction.entity.js';

@Controller('predictions')
export class PredictionsController {
  constructor(
    private readonly predictionsService: PredictionsService,
  ) {}

  // GET /predictions
  @Get()
  findAll(): Promise<Prediction[]> {
    return this.predictionsService.findAll();
  }

  // GET /predictions/:id
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Prediction> {
    return this.predictionsService.findOne(id);
  }

  // POST /predictions
  @Post()
  create(
    @Body() data: CreatePredictionInput,
  ): Promise<Prediction> {
    return this.predictionsService.create(data);
  }

  // DELETE /predictions/:id
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.predictionsService.remove(id);
  }
}
