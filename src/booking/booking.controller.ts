import { Controller, Post, Body } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly booking: BookingService) {}

  @Post('request')
  async request(@Body() body: { seatId: number; user: string }) {
    return this.booking.request(body.seatId, body.user);
  }

  @Post('confirm')
  async confirm(@Body() body: { seatId: number; user: string }) {
    return this.booking.confirm(body.seatId, body.user);
  }
}