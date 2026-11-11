
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Prediction } from './entities/prediction.entity.js';
import { Location } from '../locations/entities/location.entity.js';

export interface CreatePredictionInput {
  locationId: number;
  riskLevel: string;
  probability?: number;
  modelName: string;
  resultSummary?: string;
  predictionDate?: Date;
}

@Injectable()
export class PredictionsService {
  constructor(
    @InjectRepository(Prediction)
    private readonly predictionRepository: Repository<Prediction>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  /// Mengambil semua hasil prediksi
async findAll(): Promise<Prediction[]> {
  return this.predictionRepository.find({
    relations: {
      location: true,
    },
    order: { createdAt: 'DESC' },
  });
}

  // Mengambil prediksi berdasarkan ID
  async findOne(id: number): Promise<Prediction> {
    const prediction = await this.predictionRepository.findOne({
      where: { id },
      relations: {
        location: true,
      },
    });

    if (!prediction) {
      throw new NotFoundException(
        `Prediksi dengan ID ${id} tidak ditemukan`,
      );
    }

    return prediction;
  }

  // Menambahkan hasil prediksi
  async create(data: CreatePredictionInput): Promise<Prediction> {
    const location = await this.locationRepository.findOneBy({
      id: data.locationId,
    });

    if (!location) {
      throw new NotFoundException(
        `Lokasi dengan ID ${data.locationId} tidak ditemukan`,
      );
    }

    const prediction = this.predictionRepository.create({
      ...data,
      location,
    });

    return this.predictionRepository.save(prediction);
  }

  // Menghapus hasil prediksi
  async remove(id: number): Promise<{ message: string }> {
    const prediction = await this.findOne(id);

    await this.predictionRepository.remove(prediction);

    return { message: 'Data prediksi berhasil dihapus' };
  }
}
