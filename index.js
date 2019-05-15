import express from 'express';
import { getHtml, getProducts } from './lib/scraper';
import './lib/cron.js';
import { reebokMensCrossfitUrl } from './lib/constants.js';

const app = express();
app.get('/products', async (req, res, next) => {
  console.log('scraping');
  const data = await getProducts(await getHtml(reebokMensCrossfitUrl));
  res.json(data);
});

app.listen(3030, () => console.log('Running on port 3030'));
