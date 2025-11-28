import { Controller, Get } from '@nestjs/common';
import { SeatsService } from './seats.service';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seats: SeatsService) {}

  @Get()
  get() {
    return this.seats.list();
  }
}