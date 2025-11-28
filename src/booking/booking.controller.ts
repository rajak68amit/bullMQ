// booking/booking.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async bookSeat(@Body() body: { seatId: number; user: string }) {
    console.log('Received booking request:', body);
    /* await this.bookingService.queueBooking(body.seatId, body.user);
    return { message: `Booking request queued for Seat ${body.seatId}, User ${body.user}` }; */
     const result = await this.bookingService.queueBooking(body.seatId, body.user);
     console.log('Booking result:', result);
  return result; // returns { status: 'success', seatId, user }

  }
}