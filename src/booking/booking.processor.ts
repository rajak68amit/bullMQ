import { Processor, WorkerHost } from '@nestjs/bullmq';
import { SeatsService } from '../seats/seats.service';

@Processor('bookingQueue')
export class BookingProcessor extends WorkerHost {
  constructor(private readonly seats: SeatsService) {
    super();
  }

  async process(job: any) {
    const { seatId, user } = job.data;

    if (job.name === 'bookSeat') {
      const ok = this.seats.lock(seatId);
      if (!ok) {
        throw new Error(`Seat ${seatId} already locked/booked`);
      }
      // Add any side-effects here (notify, start payment, etc.)
      return { status: 'locked', seatId, user };
    }

    if (job.name === 'releaseSeat') {
      this.seats.release(seatId);
      return { status: 'released', seatId };
    }

    return { status: 'noop' };
  }
}