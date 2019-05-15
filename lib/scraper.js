import axios from 'axios';
import cheerio from 'cheerio';
import db from './db.js';
import { reebokMensCrossfitUrl } from './constants.js';

export async function getHtml(url) {
  const { data: html } = await axios.get(url);
  return html;
}

export async function getProducts(html) {
  const serializedProducts = [];
  const $ = cheerio.load(html);
  const allProducts = $('.product-tile');

  allProducts.each((i, product) => {
    const productPrice = $(product)
      .find('.salesprice')
      .html()
      .replace(/\s/g, '');

    const info = $(product)
      .find('.product-info-inner-content .product-link')
      .data();

    const productImage = $(product)
      .find('.plp-image-bg-link img')
      .data('original');

    const prodcutHref = $(product)
      .find('.product-info-inner-content .product-link')
      .attr('href');

    const productLink = `https://www.reebok.pl${prodcutHref}`;
    const { productname: productName, track: key } = info;

    const productData = {
      key,
      productName,
      productPrice,
      productLink,
      productImage
    };

    return serializedProducts.push(productData);
  });

  return serializedProducts;
}

export async function runCroneJob() {
  const data = await getProducts(await getHtml(reebokMensCrossfitUrl));

  db.get('crossfitShoes')
    .push({
      date: Date.now(),
      products: data
    })
    .write();
  console.log('Finished! 🙌');
}
