import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingProcessor } from './booking.processor';
import { BookingController } from './booking.controller';
import { SeatsModule } from '../seats/seats.module';


@Module({
  imports: [SeatsModule],
  controllers: [BookingController],
  providers: [BookingService, BookingProcessor],
  exports: [BookingService],
})
export class BookingModule {}