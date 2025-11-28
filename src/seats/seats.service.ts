import { Injectable } from '@nestjs/common';

type SeatState = 'free' | 'locked' | 'booked';

@Injectable()
export class SeatsService {
  private seats = new Map<number, SeatState>();

  constructor() {
    for (let i = 1; i <= 5; i++) this.seats.set(i, 'free');
  }

  list() {
    return Array.from(this.seats.entries()).map(([id, status]) => ({ id, status }));
  }

  lock(seatId: number): boolean {
    const state = this.seats.get(seatId);
    if (state === 'free') {
      this.seats.set(seatId, 'locked');
      return true;
    }
    return false;
  }

  confirm(seatId: number): boolean {
    const state = this.seats.get(seatId);
    if (state === 'locked') {
      this.seats.set(seatId, 'booked');
      return true;
    }
    return false;
  }

  release(seatId: number): void {
    if (this.seats.get(seatId) === 'locked') {
      this.seats.set(seatId, 'free');
    }
  }
}