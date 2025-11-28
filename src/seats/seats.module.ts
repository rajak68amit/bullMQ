import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { BookingProcessor } from '../booking/booking.processor';

@Module({
  controllers: [SeatsController],
  providers: [SeatsService , BookingProcessor],
  exports: [SeatsService], // export so BookingModule can use it
})
export class SeatsModule {}