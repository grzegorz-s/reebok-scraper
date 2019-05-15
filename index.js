import express from 'express';
import { getHtml, getProducts } from './lib/scrapper';

const reebokMensCrossfitUrl =
  'https://www.reebok.pl/mezczyzni-buty-crossfit?prefn1=sizeSearchValue&prefv1=39%7C40';

const app = express();

app.get('/products', async (req, res, next) => {
  console.log('scrapping');
  const data = await getProducts(await getHtml(reebokMensCrossfitUrl));
  console.log(data);
  res.json(data);
});

app.listen(3030, () => console.log('Running on port 3030'));
