import { Processor, WorkerHost } from '@nestjs/bullmq';
import { SeatsService } from '../seats/seats.service';

@Processor('bookingQueue')
export class BookingProcessor extends WorkerHost {
  constructor(private readonly seatsService: SeatsService) {
    super();
  }

  async process(job: any) {
    const { seatId, user } = job.data;
    console.log(`Processing booking for User: ${user}, Seat: ${seatId}`);

    const success = this.seatsService.bookSeat(seatId);

    if (!success) {
      throw new Error(`Seat ${seatId} already booked!`);
    }

    console.log(`✅ Booking confirmed for User: ${user}, Seat: ${seatId}`);
    return { status: 'success', seatId, user };
  }

}