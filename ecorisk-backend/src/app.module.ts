import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { WeatherModule } from './weather/weather.module.js';
import { PredictionsModule } from './predictions/predictions.module.js';
import { HotspotsModule } from './hotspots/hotspots.module.js';
import { LocationsModule } from './locations/locations.module.js';

export const { ObserveInstrument } = createObserveModule();

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
