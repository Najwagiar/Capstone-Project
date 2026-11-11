
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity.js';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  // Mengambil semua data lokasi
  async findAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  // Mengambil lokasi berdasarkan ID
  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepository.findOneBy({ id });

    if (!location) {
      throw new NotFoundException(
        `Lokasi dengan ID ${id} tidak ditemukan`,
      );
    }

    return location;
  }

  // Menambahkan lokasi baru
  async create(data: Partial<Location>): Promise<Location> {
    const location = this.locationRepository.create(data);
    return this.locationRepository.save(location);
  }

  // Memperbarui data lokasi
  async update(
    id: number,
    data: Partial<Location>,
  ): Promise<Location> {
    const location = await this.findOne(id);

    Object.assign(location, data);

    return this.locationRepository.save(location);
  }

  // Menghapus data lokasi
  async remove(id: number): Promise<{ message: string }> {
    const location = await this.findOne(id);

    await this.locationRepository.remove(location);

    return { message: 'Data lokasi berhasil dihapus' };
  }
}
