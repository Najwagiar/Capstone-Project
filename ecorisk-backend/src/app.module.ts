
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HotspotsModule } from './hotspots/hotspots.module.js';
import { DisasterRiskModule } from './disaster-risk/disaster-risk.module.js';
import { WeatherModule } from './weather/weather.module.js';

import { LocationsModule } from './locations/locations.module.js';
import { UsersModule } from './users/users.module.js';
import { PredictionsModule } from './predictions/predictions.module.js';

@Module({
  imports: [
    // Konfigurasi environment
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_DATABASE ?? 'Ecorisk_Intellegent',
  autoLoadEntities: true,
  synchronize: false,
}),

    // Modul utama
    HotspotsModule,
    DisasterRiskModule,
    WeatherModule,

    // Modul tambahan
    LocationsModule,
    UsersModule,
    PredictionsModule,
  ],
})
export class AppModule {}
