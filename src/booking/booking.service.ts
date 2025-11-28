import { Injectable } from '@nestjs/common';

import { connection } from './redis';
import { Queue, QueueEvents } from 'bullmq';

@Injectable()
export class BookingService {
 private bookingQueue: Queue;
  private queueEvents: QueueEvents;

   constructor() {
    this.bookingQueue = new Queue('bookingQueue', { connection });
    this.queueEvents = new QueueEvents('bookingQueue', { connection });
  }



async queueBooking(seatId: number, user: string) {
    const job = await this.bookingQueue.add('bookSeat', { seatId, user });

    // ✅ Pass QueueEvents, not Redis
    const result = await job.waitUntilFinished(this.queueEvents);

    return result;
  }




}