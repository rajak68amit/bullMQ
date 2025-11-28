import { Injectable, OnModuleInit } from '@nestjs/common';
import { connection } from '../booking/redis';
import Redis from 'ioredis';

@Injectable()
export class SeatsService implements OnModuleInit {
  private redis: Redis;

  constructor() {
    this.redis = connection;
  }

  async onModuleInit() {
    await this.initializeSeats(5); // demo: 5 seats
  }

  async initializeSeats(total: number) {
    const exists = await this.redis.exists('seats:1');
    if (!exists) {
      for (let i = 1; i <= total; i++) {
        await this.redis.set(`seats:${i}`, 'false');
      }
    }
  }

  async getSeats() {
    const keys = await this.redis.keys('seats:*');
    const seats: { id: number; booked: boolean }[] = [];
    for (const key of keys) {
      const id = parseInt(key.split(':')[1]);
      const booked = (await this.redis.get(key)) === 'true';
      seats.push({ id, booked });
    }
    return seats.sort((a, b) => a.id - b.id);
  }

  async bookSeat(seatId: number): Promise<boolean> {
    const key = `seats:${seatId}`;
    const result = await this.redis.eval(
      "if redis.call('get', KEYS[1]) == 'false' then redis.call('set', KEYS[1], 'true'); return 1; else return 0; end",
      1,
      key
    );

    return result === 1;
  }
}