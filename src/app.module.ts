import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeatsModule } from './seats/seats.module';
import { BookingModule } from './booking/booking.module';




@Module({
  imports: [SeatsModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
