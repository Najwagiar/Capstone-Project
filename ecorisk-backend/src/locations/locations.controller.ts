
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { LocationsService } from './locations.service.js';
import { Location } from './entities/location.entity.js';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  // GET /locations
  @Get()
  findAll(): Promise<Location[]> {
    return this.locationsService.findAll();
  }

  // GET /locations/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Location> {
    return this.locationsService.findOne(id);
  }

  // POST /locations
  @Post()
  create(@Body() data: Partial<Location>): Promise<Location> {
    return this.locationsService.create(data);
  }

  // PUT /locations/:id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Location>,
  ): Promise<Location> {
    return this.locationsService.update(id, data);
  }

  // DELETE /locations/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.locationsService.remove(id);
  }
}
