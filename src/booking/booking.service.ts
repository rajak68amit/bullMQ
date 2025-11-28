import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Queue, QueueEvents } from 'bullmq';
import { connection } from './redis';
import { SeatsService } from '../seats/seats.service';

@Injectable()
export class BookingService implements OnModuleDestroy {
  private readonly bookingQueue = new Queue('bookingQueue', { connection });
  private readonly queueEvents = new QueueEvents('bookingQueue', { connection });

  constructor(private readonly seats: SeatsService) {}

  async request(seatId: number, user: string) {
    const job = await this.bookingQueue.add('bookSeat', { seatId, user });

    // DEMO mode: wait synchronously for worker result
    const result = await job.waitUntilFinished(this.queueEvents);
    // Schedule auto-release in 30s unless confirmed
    await this.bookingQueue.add('releaseSeat', { seatId }, { delay: 30000 });
    return result;
  }

  async confirm(seatId: number, user: string) {
    const ok = this.seats.confirm(seatId);
    if (!ok) {
      return { status: 'failed', message: `Seat ${seatId} not locked or already booked` };
    }
    return { status: 'success', message: `Seat ${seatId} booked for ${user}` };
  }

  async onModuleDestroy() {
    await this.queueEvents.close();
    await this.bookingQueue.close();
  }
}