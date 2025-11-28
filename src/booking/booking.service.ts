import { Injectable } from '@nestjs/common';
import { Queue, QueueEvents } from 'bullmq';
import { connection } from './redis';


@Injectable()
export class BookingService {
  private bookingQueue = new Queue('bookingQueue', { connection });
  private queueEvents = new QueueEvents('bookingQueue', { connection });

  async queueBooking(seatId: number, user: string) {
    const job = await this.bookingQueue.add('bookSeat', { seatId, user });
    const result = await job.waitUntilFinished(this.queueEvents); // wait for worker
    if(result.status !== 'success') {
      throw new Error(`Booking failed for Seat ${seatId}, User ${user}`);
    }
    return result; // { status: 'success', seatId, user } OR error

  }
}
