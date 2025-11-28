import { Module } from '@nestjs/common';
import { SeatsModule } from './seats/seats.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [SeatsModule, BookingModule],
})
export class AppModule {}