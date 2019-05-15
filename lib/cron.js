import cron from 'node-cron';
import { runCroneJob } from './scraper';

cron.schedule('30 * * * *', () => {
  console.log('⏱ Running cron every minute of every hour');
  runCroneJob();
});
