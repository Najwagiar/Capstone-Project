
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Mengambil semua pengguna
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Mengambil pengguna berdasarkan ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(
        `Pengguna dengan ID ${id} tidak ditemukan`,
      );
    }

    return user;
  }

  // Menambahkan pengguna baru
  async create(data: Partial<User>): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: data.email },
        { username: data.username },
      ],
    });

    if (existingUser) {
      throw new ConflictException(
        'Email atau username sudah digunakan',
      );
    }

    const user = this.userRepository.create(data);

    return this.userRepository.save(user);
  }

  // Memperbarui data pengguna
  async update(
    id: number,
    data: Partial<User>,
  ): Promise<User> {
    const user = await this.findOne(id);

    if (data.email || data.username) {
      const existingUser = await this.userRepository.findOne({
        where: [
          ...(data.email ? [{ email: data.email }] : []),
          ...(data.username ? [{ username: data.username }] : []),
        ],
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException(
          'Email atau username sudah digunakan',
        );
      }
    }

    Object.assign(user, data);

    return this.userRepository.save(user);
  }

  // Menghapus pengguna
  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);

    return { message: 'Pengguna berhasil dihapus' };
  }
}
