import { Processor, WorkerHost } from '@nestjs/bullmq';
import { SeatsService } from '../seats/seats.service';

@Processor('bookingQueue')
export class BookingProcessor extends WorkerHost {
  constructor(private readonly seatsService: SeatsService) { super(); }

  async process(job: any) {
    console.log("Processing job:", job.id, job.data);
    const { seatId, user } = job.data;
    const success = this.seatsService.lockSeat(seatId);
       if (!success) {
      throw new Error(`Seat ${seatId} already booked`);
    }

    return { status: 'success', seatId, user };
  }

/*   async completed(job: any) {
    const { seatId, user } = job.data;
    this.seatsService.unlockSeat(seatId);
  }
} */

}