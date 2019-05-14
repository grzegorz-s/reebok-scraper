import { getHtml, getProducts } from './lib/scrapper';

const reebokMensCrossfitUrl =
  'https://www.reebok.pl/mezczyzni-buty-crossfit?prefn1=sizeSearchValue&prefv1=39%7C40';

async function run() {
  console.log(await getProducts(await getHtml(reebokMensCrossfitUrl)));
}

run();
