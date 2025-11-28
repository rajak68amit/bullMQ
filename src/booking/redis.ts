import Redis, { RedisOptions } from 'ioredis';

const options: RedisOptions = {
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: null,   // ✅ required by BullMQ
  enableReadyCheck: false,      // ✅ recommended
};

export const connection = new Redis(options);