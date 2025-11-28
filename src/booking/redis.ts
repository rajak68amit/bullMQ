import Redis, { RedisOptions } from 'ioredis';

const options: RedisOptions = {
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: null,   // required by BullMQ
  enableReadyCheck: false,
};

export const connection = new Redis(options);

// Listen for connection events
connection.on('connect', () => {
  console.log('✅ Redis connected');
});

connection.on('ready', () => {
  console.log('✅ Redis ready to use');
});

connection.on('error', (err) => {
  console.error('❌ Redis error', err);
});

connection.on('end', () => {
  console.log('❌ Redis connection closed');
});
